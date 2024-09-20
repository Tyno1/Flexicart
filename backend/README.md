# FlexiCart Backend API

## Overview
FlexiCart backend APIis  designed to support a mobile commerce solution (web interface and mobile application)  for small businesses. It provides the necessary endpoints and functionality to manage products, orders, user authentication, and more.

## Technologies Used
- Node.js
- Express.js
- MongoDB with Mongoose
- JSON Web Tokens (JWT) for authentication
- Bcrypt for password hashing
- Cloudinary for image storage
- Stripe for payment processing
- MailerSend for email services

## Prerequisites
- Node.js (v14.0.0 or later recommended)
- MongoDB instance (local or cloud-based)
- Cloudinary account
- Stripe account
- MailerSend account

## Installation

1. Install dependencies
    npm install

2. Setup environment variables:

   - Locate the environment variables file in the submission link provided.
   - The file is in the backend folder.
   - rename the file from "env" to ".env" .(Did not want to send it as .env becase it will be hidden)
   - Copy the .env file from the backend folder to the root directory of the mobile app project.

3. Start the project
   npm run start:dev

4. The backend is hosted on render.com

