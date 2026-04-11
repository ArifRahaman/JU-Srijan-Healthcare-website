# JU-Srijan Healthcare Website API Reference

## Overview

This API provides endpoints for user and doctor interactions, utility functions, and chatbot services. It supports operations such as user and doctor registration, appointment scheduling, and fetching doctor details.

## Authentication

- **JWT Authentication** is used for securing endpoints that require authentication.
- Include the JWT token in the `Authorization` header as a Bearer token for protected routes.

## Endpoints

### Doctors

#### POST /signup
- **Description**: Register a new doctor.
- **Request Body**:
  ```json
  {
    "fullName": "string",
    "email": "string",
    "password": "string",
    "department": "string",
    "education": "string",
    "address": "string",
    "experience": "number"
  }
  ```
- **Response**:
  - **201 Created**: Doctor registered successfully.
  - **400 Bad Request**: Validation error.
- **Curl Example**:
  ```bash
  curl -X POST http://localhost:8000/doctors/signup -H "Content-Type: application/json" -d '{"fullName":"Dr. Smith","email":"dr.smith@example.com","password":"password123","department":"Cardiology","education":"MD","address":"123 Street","experience":5}'
  ```

#### POST /verify-otp
- **Description**: Verify OTP for doctor registration.
- **Request Body**:
  ```json
  {
    "email": "string",
    "otp": "string"
  }
  ```
- **Response**:
  - **200 OK**: OTP verified successfully.
  - **400 Bad Request**: Invalid OTP.
- **Curl Example**:
  ```bash
  curl -X POST http://localhost:8000/doctors/verify-otp -H "Content-Type: application/json" -d '{"email":"dr.smith@example.com","otp":"123456"}'
  ```

#### POST /login
- **Description**: Login for doctors.
- **Request Body**:
  ```json
  {
    "email": "string",
    "password": "string"
  }
  ```
- **Response**:
  - **200 OK**: Returns JWT token.
  - **401 Unauthorized**: Invalid credentials.
- **Curl Example**:
  ```bash
  curl -X POST http://localhost:8000/doctors/login -H "Content-Type: application/json" -d '{"email":"dr.smith@example.com","password":"password123"}'
  ```

#### GET /doctor-details
- **Description**: Get details of a specific doctor.
- **Response**:
  - **200 OK**: Returns doctor details.
  - **404 Not Found**: Doctor not found.
- **Curl Example**:
  ```bash
  curl -X GET http://localhost:8000/doctors/doctor-details -H "Authorization: Bearer <token>"
  ```

### Users

#### POST /signup
- **Description**: Register a new user.
- **Request Body**:
  ```json
  {
    "fullName": "string",
    "email": "string",
    "password": "string",
    "address": "string",
    "profession": "string"
  }
  ```
- **Response**:
  - **201 Created**: User registered successfully.
  - **400 Bad Request**: Validation error.
- **Curl Example**:
  ```bash
  curl -X POST http://localhost:8000/users/signup -H "Content-Type: application/json" -d '{"fullName":"John Doe","email":"john.doe@example.com","password":"password123","address":"456 Avenue","profession":"Engineer"}'
  ```

#### POST /verify-otp
- **Description**: Verify OTP for user registration.
- **Request Body**:
  ```json
  {
    "email": "string",
    "otp": "string"
  }
  ```
- **Response**:
  - **200 OK**: OTP verified successfully.
  - **400 Bad Request**: Invalid OTP.
- **Curl Example**:
  ```bash
  curl -X POST http://localhost:8000/users/verify-otp -H "Content-Type: application/json" -d '{"email":"john.doe@example.com","otp":"123456"}'
  ```

#### POST /login
- **Description**: Login for users.
- **Request Body**:
  ```json
  {
    "email": "string",
    "password": "string"
  }
  ```
- **Response**:
  - **200 OK**: Returns JWT token.
  - **401 Unauthorized**: Invalid credentials.
- **Curl Example**:
  ```bash
  curl -X POST http://localhost:8000/users/login -H "Content-Type: application/json" -d '{"email":"john.doe@example.com","password":"password123"}'
  ```

#### GET /get-all-doctors
- **Description**: Fetch all registered doctors.
- **Response**:
  - **200 OK**: Returns list of doctors.
- **Curl Example**:
  ```bash
  curl -X GET http://localhost:8000/users/get-all-doctors
  ```

### Utility

#### GET /stats
- **Description**: Get statistics.
- **Response**:
  - **200 OK**: Returns statistics data.
- **Curl Example**:
  ```bash
  curl -X GET http://localhost:8000/utility/stats
  ```

### Chatbot

#### POST /postquestion
- **Description**: Post a question to the chatbot.
- **Request Body**:
  ```json
  {
    "question": "string",
    "username": "string",
    "email_support": "string"
  }
  ```
- **Response**:
  - **200 OK**: Returns response message.
- **Curl Example**:
  ```bash
  curl -X POST http://localhost:5000/postquestion -H "Content-Type: application/json" -d '{"question":"What is the schedule?","username":"john","email_support":"support@example.com"}'
  ```

## Error Codes

- **400 Bad Request**: The request could not be understood or was missing required parameters.
- **401 Unauthorized**: Authentication failed or user does not have permissions for the desired action.
- **404 Not Found**: The requested resource could not be found.
- **500 Internal Server Error**: An error occurred on the server.

This documentation provides a comprehensive guide to the available endpoints, request/response schemas, authentication methods, error codes, and example curl commands for interacting with the JU-Srijan Healthcare Website API.