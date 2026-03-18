import React, { useState } from "react";
import axios from "axios";
import Loader from "./Loader.jsx";
import Success from "./Success.jsx";

const BACKEND_DOMAIN = process.env.NEXT_PUBLIC_BACKEND_DOMAIN;

const SUCCESS_STATUS_CODE = 200;
const ERROR_STATUS_CODE = 404;
const TOAST_DISPLAY_DURATION_MS = 3000;

const ContactUsPage = () => {
  const [responseMessage, setResponseMessage] = useState({
    text: "",
    statusCode: 0,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  function handleInputChange(event) {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  }

  async function submitContactForm(event) {
    event.preventDefault();
    setIsLoading(true);
    try {
      const response = await axios.post(`${BACKEND_DOMAIN}/utility/contact-us`, {
        name: formData.name,
        email: formData.email,
        message: formData.message,
      });

      if (response) {
        setIsLoading(false);
        setResponseMessage({ text: "Your message is sent successfully", statusCode: SUCCESS_STATUS_CODE });
      }
    } catch (error) {
      console.error("Error sending contact form:", error);
      setResponseMessage({ text: "There was a problem associated.", statusCode: ERROR_STATUS_CODE });
    }
    displayToast();
  }

  const [showToast, setShowToast] = useState(false);

  // Function to show the toast
  const displayToast = () => {
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, TOAST_DISPLAY_DURATION_MS); // Hide the toast after 3 seconds
  };

  return (
    <>
      <div className="relative">
        {showToast && <Success message={responseMessage} />}
      </div>

      {isLoading && <Loader />}
      <div className="bg-gray-100">
        <div className="container mx-auto p-8">
          <h1 className="text-4xl font-bold mb-8 text-center">Contact Us</h1>

          <div className="flex justify-center">
            <div className="w-full lg:w-1/2">
              <form className=" p-6 rounded-lg shadow-md">
                <div className="mb-4">
                  <label
                    htmlFor="name"
                    className="block text-gray-800 font-semibold mb-2"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="w-full border p-2 rounded-md focus:outline-none focus:border-blue-500"
                    placeholder="Your Name"
                    onChange={(e) => {
                      handleInputChange(e);
                    }}
                  />
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="email"
                    className="block text-gray-800 font-semibold mb-2"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="w-full border p-2 rounded-md focus:outline-none focus:border-blue-500"
                    placeholder="Your Email"
                    onChange={(e) => {
                      handleInputChange(e);
                    }}
                  />
                </div>

                <div className="mb-4">
                  <label
                    htmlFor="message"
                    className="block text-gray-800 font-semibold mb-2"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows="4"
                    className="w-full border p-2 rounded-md focus:outline-none focus:border-blue-500"
                    placeholder="Your Message"
                    onChange={(e) => {
                      handleInputChange(e);
                    }}
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="bg-blue-500 text-white py-2 px-4 rounded-full font-semibold hover:bg-blue-600 transition duration-300"
                  onClick={(e) => {
                    submitContactForm(e);
                  }}
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactUsPage;
