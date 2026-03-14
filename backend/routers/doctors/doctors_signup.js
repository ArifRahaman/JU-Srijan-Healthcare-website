import express from 'express';
import { Doctor, User, patientHistory } from '../../schemas/schemas.js';
import SendEmail from '../../email/email.js';
import { hash, compare } from "bcrypt";
import { config } from "dotenv";
import jwt from "jsonwebtoken";
import logger from '../../logger/logger.js'; // Assuming a logger module is available

config();
const SECRET_KEY = process.env.SECRET_KEY;
const OTP_MIN = 1000;
const OTP_MAX = 9000;
const HASH_ROUNDS = 10;

const doctorSignupRouter = express.Router();

doctorSignupRouter.post("/signup", async (req, res) => {
    const { fullName, education, address, experience, email, department, password } = req.body;

    try {
        const existingDoctor = await Doctor.findOne({ email });
        if (existingDoctor) {
            res.status(203).send({ message: "Username already exists" });
            return;
        }

        const otp = Math.floor(OTP_MIN + Math.random() * (OTP_MAX - OTP_MIN));

        try {
            const emailSent = await SendEmail(email, otp);
            logger.info(`Email sent: ${emailSent}`);

            const hashedPassword = await hash(password, HASH_ROUNDS);

            const newDoctor = new Doctor({
                fullName,
                address,
                education,
                experience,
                email,
                department,
                password: hashedPassword,
                otp,
                isVerified: false,
            });

            await newDoctor.save();

            res.json({
                success: true,
                message: "Please check your email for OTP verification.",
            });
        } catch (err) {
            logger.error("Error saving doctor data:", err);
            res.status(500).json({ success: false, message: "Signup failed. Please try again." });
        }
    } catch (error) {
        logger.error("Error in signup:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
});

doctorSignupRouter.post("/verify-otp", async (req, res) => {
    try {
        const { email, otp } = req.body;

        const doctor = await Doctor.findOne({ email });

        if (doctor.isVerified) {
            res.status(400).json({ message: "OTP already verified" });
            return;
        }

        if (doctor && doctor.otp === otp) {
            doctor.isVerified = true;
            await doctor.save();
            res.json({ success: true, message: "Email verified successfully." });
        } else {
            res.status(401).json({ success: false, message: "Invalid OTP. Please try again." });
        }
    } catch (error) {
        logger.error("Error in /verify-otp:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
});

doctorSignupRouter.post("/resend-otp", async (req, res) => {
    try {
        const { email } = req.body;

        const otp = Math.floor(OTP_MIN + Math.random() * (OTP_MAX - OTP_MIN));

        try {
            const emailSent = await SendEmail(email, otp);
            logger.info(`Email sent: ${emailSent}`);

            const doctor = await Doctor.findOne({ email });
            if (doctor) {
                doctor.otp = otp;
                await doctor.save();
                res.json({
                    success: true,
                    message: "New OTP sent. Please check your email for verification.",
                });
            } else {
                res.status(401).json({ success: false, message: "Doctor not found. Resending OTP failed." });
            }
        } catch (err) {
            logger.error("Error resending OTP:", err);
            res.status(500).json({ success: false, message: "Internal Server Error" });
        }
    } catch (error) {
        logger.error("Error in /resend-otp:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
});

doctorSignupRouter.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        const doctor = await Doctor.findOne({ email });

        if (doctor && doctor.isVerified) {
            const passwordMatch = await compare(password, doctor.password);
            if (passwordMatch) {
                const accessToken = jwt.sign(
                    {
                        email: doctor.email,
                        fullName: doctor.fullName,
                        education: doctor.education,
                        experience: doctor.experience,
                        role: doctor.role,
                        department: doctor.department,
                    },
                    SECRET_KEY,
                    {
                        expiresIn: "1w",
                    }
                );

                res.json({
                    success: true,
                    message: `Welcome, ${doctor.fullName}!`,
                    accessToken: accessToken,
                });
            } else {
                res.status(401).json({ success: false, message: "Incorrect email or password." });
            }
        } else {
            res.status(401).json({
                success: false,
                message: "Invalid email or unverified account.",
            });
        }
    } catch (error) {
        logger.error("Error in /login:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
});

doctorSignupRouter.get("/doctor-details", async (req, res) => {
    try {
        const accessToken = req.headers.authorization;

        if (!accessToken || !accessToken.startsWith("Bearer ")) {
            return res.status(401).json({
                success: false,
                message: "Access token is missing or not in the correct format.",
            });
        }
        const token = accessToken.split("Bearer ")[1];

        jwt.verify(token, SECRET_KEY, async (err, decoded) => {
            if (err) {
                return res.status(401).json({
                    success: false,
                    message: "Invalid access token.",
                });
            }

            const doctor = await Doctor.findOne({ email: decoded.email });

            res.json({
                success: true,
                userDetails: {
                    email: doctor.email,
                    fullName: doctor.fullName,
                    address: doctor.address,
                    education: doctor.education,
                    experience: doctor.experience,
                    role: doctor.role,
                    department: doctor.department,
                    appointments: doctor.appointments,
                },
            });
        });
    } catch (err) {
        logger.error("Error in /doctor-details:", err);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
});

doctorSignupRouter.post("/patient-details", async (req, res) => {
    try {
        const { doctor_email, patient_email, remark, time } = req.body;
        const patient = await User.findOne({ email: patient_email });

        const patientHistoryRecord = new patientHistory({
            doctor_email: doctor_email,
            remark: remark,
            time,
        });

        patient.histories.push(patientHistoryRecord);
        await patient.save();

        res.send({ message: "Data saved successfully" });
    } catch (err) {
        logger.error("Error in /patient-details:", err);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
});

doctorSignupRouter.post("/patients-history", async (req, res) => {
    try {
        const { meet_link } = req.body;
        const user = await User.findOne({ "appointments.meet_link": meet_link });
        if (!user) {
            return res.status(404).send({ message: "Sorry no such user exists" });
        }

        const filteredHistories = user.histories.map(history => ({
            doctor_email: history.doctor_email,
            remark: history.remark,
            time: history.time,
        }));

        res.send(filteredHistories);
    } catch (err) {
        logger.error("Error in /patients-history:", err);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
});

export { doctorSignupRouter };