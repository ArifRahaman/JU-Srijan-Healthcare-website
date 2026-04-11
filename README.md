# JU-Srijan Healthcare Website

![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)
![GitHub stars](https://img.shields.io/github/stars/ArifRahaman/JU-Srijan-Healthcare-website)
![GitHub forks](https://img.shields.io/github/forks/ArifRahaman/JU-Srijan-Healthcare-website)

## Overview

The JU-Srijan Healthcare Website is a comprehensive platform designed to provide quality healthcare services through a user-friendly web interface. It facilitates interactions between patients and healthcare professionals, offering features like doctor consultations, appointment scheduling, and a chatbot for mental health support.

## Features

- **Doctor Signup and Login**: Allows doctors to register and manage their profiles.
- **User Signup and Login**: Enables users to create accounts and book appointments.
- **Appointment Scheduling**: Users can book appointments with doctors from various specialties.
- **Chatbot Support**: Provides mental health support through an AI-powered chatbot.
- **Video Consultations**: Facilitates video interactions between doctors and patients.
- **Specialist Directory**: Lists doctors by specialty, including Psychology, Neurology, Ophthalmology, Cardiology, and Dermatology.

## Tech Stack

- **Frontend**: React, Next.js, Tailwind CSS
- **Backend**: Node.js, Express, MongoDB
- **Chatbot**: Python, FastAPI
- **Email**: Nodemailer
- **Authentication**: JSON Web Tokens (JWT)
- **Payment**: Stripe

## Installation

### Prerequisites

- Node.js
- Python 3.10+
- MongoDB

### Backend Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/ArifRahaman/JU-Srijan-Healthcare-website.git
   cd JU-Srijan-Healthcare-website/backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   - Create a `.env` file in the `backend` directory.
   - Add the necessary environment variables as specified in the `backend/.env.example`.

4. Start the backend server:
   ```bash
   npm start
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd ../frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   - Create a `.env` file in the `frontend` directory.
   - Add the necessary environment variables as specified in the `frontend/.env.example`.

4. Start the frontend server:
   ```bash
   npm run dev
   ```

### Chatbot Setup

1. Navigate to the chatbot-backend directory:
   ```bash
   cd ../chatbot-backend
   ```

2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

3. Set up environment variables:
   - Create a `.env` file in the `chatbot-backend` directory.
   - Add the necessary environment variables as specified in the `chatbot-backend/.env.example`.

4. Start the chatbot server:
   ```bash
   uvicorn main:app --reload
   ```

## Usage Examples

- **Access the Website**: Open your browser and go to `http://localhost:3000` to access the frontend.
- **API Endpoints**: Use tools like Postman to interact with backend endpoints for testing purposes.

## Configuration

- **Environment Variables**: Ensure all required environment variables are set in the respective `.env` files for backend, frontend, and chatbot-backend.
- **MongoDB**: Ensure MongoDB is running and accessible with the credentials provided in the `.env` files.

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes and commit them (`git commit -m 'Add new feature'`).
4. Push to the branch (`git push origin feature-branch`).
5. Open a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.