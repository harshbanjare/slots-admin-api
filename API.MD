# Slots Admin API Documentation

## Base URL

`/api`

## Authentication

- Protected routes require a JWT token in the Authorization header
- Format: `Bearer <token>`

## Error Responses

All endpoints may return these error responses:

{
"message": "Error message",
"error": "Detailed error message" // Only in development
}

## Business Routes

Base path: `/businesses`

### Create Business

Create a new business profile.
