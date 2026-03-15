import express from 'express';
import { hash, compare } from "bcrypt";
import { config } from "dotenv";
import { User, Doctor } from '../../schemas/schemas.js';
import SendEmail from '../../email/email.js';
import jwt from "jsonwebtoken";

config();
const SECRET_KEY = process.env.SECRET_KEY;

const utilityRouter = express.Router();

utilityRouter.get("/stats", async (req, res) => {
    try {
        const totalDoctors = await Doctor.find().count();
        const totalUsers = await User.find().count();

        const totalAppointmentsResult = await Doctor.aggregate([
            {
                $group: {
                    _id: null,
                    total: { $sum: { $size: "$appointments" } }
                }
            }
        ]);

        const totalAppointments = totalAppointmentsResult.length > 0 ? totalAppointmentsResult[0].total : 0;

        res.send({ totalDoctors, totalUsers, totalAppointments });
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
});

const fetchDoctorsByDepartment = async (department, res) => {
    try {
        const doctors = await Doctor.find({ department }).select('fullName education experience department address');
        res.send(doctors);
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
};

utilityRouter.get("/get-cardiologists", (req, res) => {
    fetchDoctorsByDepartment("Cardiology", res);
});

utilityRouter.get("/get-neurologists", (req, res) => {
    fetchDoctorsByDepartment("Neurology", res);
});

utilityRouter.get("/get-psychologists", (req, res) => {
    fetchDoctorsByDepartment("Psychology", res);
});

utilityRouter.get("/get-ophthalmologists", (req, res) => {
    fetchDoctorsByDepartment("Ophthalmology", res);
});

utilityRouter.get("/get-dermatologists", (req, res) => {
    fetchDoctorsByDepartment("Dermatology", res);
});

utilityRouter.post("/contact-us", async (req, res) => {
    const { name, email, message } = req.body;
    try {
        const emailSent = await SendEmail("asifrahaman137@gmail.com", message, `Concern by ${email}`, `Someone raise the following concerns.\nHi I am ${name},`);
        if (emailSent) {
            res.send({ message: "Message sent successfully" });
        } else {
            res.status(500).send({ error: "Failed to send message" });
        }
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
});

utilityRouter.get("/department-counts", async (req, res) => {
    try {
        const departmentCounts = await Promise.all([
            Doctor.find({ department: "Psychology" }).count(),
            Doctor.find({ department: "Cardiology" }).count(),
            Doctor.find({ department: "Ophthalmology" }).count(),
            Doctor.find({ department: "Neurology" }).count(),
            Doctor.find({ department: "Dermatology" }).count()
        ]);

        const [totalPsychologists, totalCardiologists, totalOphthalmologists, totalNeurologists, totalDermatologists] = departmentCounts;

        res.send({ totalPsychologists, totalCardiologists, totalOphthalmologists, totalNeurologists, totalDermatologists });
    } catch (err) {
        res.status(500).send({ error: err.message });
    }
});

export { utilityRouter };