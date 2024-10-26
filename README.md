# Slots Admin API Documentation

## Overview

A Node.js/Express API for managing appointments, businesses, and user services.

## Tech Stack

- Node.js
- Express.js
- MongoDB with Mongoose
- JWT Authentication
- bcryptjs for password hashing
- CORS enabled
- Helmet for security headers

## Installation & Setup

1. Clone the repository
2. Install dependencies: `bash
npm install   `
3. Create a `.env` file with the following variables: `MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=3000  `
4. Start the server: `bash
npm start   `

## API Endpoints

### Authentication Routes

Base path: `/api/auth`

| Method | Endpoint  | Description                | Auth Required |
| ------ | --------- | -------------------------- | ------------- |
| POST   | `/signup` | Create a new admin account | No            |
| POST   | `/login`  | Login to admin account     | No            |

### Business Routes

Base path: `/api/businesses`

| Method | Endpoint | Description           | Auth Required |
| ------ | -------- | --------------------- | ------------- |
| POST   | `/`      | Create a new business | Yes           |
| GET    | `/`      | Get all businesses    | Yes           |
| GET    | `/:id`   | Get business by ID    | Yes           |
| PUT    | `/:id`   | Update business       | Yes           |
| DELETE | `/:id`   | Delete business       | Yes           |

### Category Routes

Base path: `/api/categories`

| Method | Endpoint | Description           | Auth Required |
| ------ | -------- | --------------------- | ------------- |
| POST   | `/`      | Create a new category | Yes           |
| GET    | `/`      | Get all categories    | No            |
| GET    | `/:id`   | Get category by ID    | No            |
| PUT    | `/:id`   | Update category       | Yes           |
| DELETE | `/:id`   | Delete category       | Yes           |

### Package Routes

Base path: `/api/packages`

| Method | Endpoint                | Description                     | Auth Required |
| ------ | ----------------------- | ------------------------------- | ------------- |
| POST   | `/`                     | Create a new package            | Yes           |
| GET    | `/business/:businessId` | Get all packages for a business | No            |
| GET    | `/:id`                  | Get package by ID               | No            |
| PUT    | `/:id`                  | Update package                  | Yes           |
| DELETE | `/:id`                  | Delete package                  | Yes           |

### User Routes

Base path: `/api/users`

| Method | Endpoint     | Description       | Auth Required |
| ------ | ------------ | ----------------- | ------------- |
| POST   | `/`          | Create a new user | Yes           |
| GET    | `/`          | Get all users     | Yes           |
| GET    | `/:id`       | Get user by ID    | Yes           |
| PUT    | `/:id`       | Update user       | Yes           |
| PUT    | `/:id/chats` | Update user chats | Yes           |
| DELETE | `/:id`       | Delete user       | Yes           |

### Report Routes

Base path: `/api/reports`

| Method | Endpoint       | Description                              | Auth Required |
| ------ | -------------- | ---------------------------------------- | ------------- |
| GET    | `/overall`     | Get overall system reports and analytics | Yes           |
| GET    | `/:businessid` | Get business-specific reports            | Yes           |

## Authentication

Protected routes require a JWT token in the Authorization header:
# slots-admin-api
