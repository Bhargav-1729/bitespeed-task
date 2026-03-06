# Bitespeed Identity Reconciliation API

This project implements the Bitespeed backend task for reconciling customer identities using email and phone numbers.

## Tech Stack

- Node.js
- Express.js
- PostgreSQL (Supabase)
- Sequelize ORM

## API Endpoint

POST /identify

### Request

{
  "email": "mcfly@hillvalley.edu",
  "phoneNumber": "123456"
}

### Response

{
  "contact": {
    "primaryContactId": 1,
    "emails": [
      "lorraine@hillvalley.edu",
      "mcfly@hillvalley.edu"
    ],
    "phoneNumbers": ["123456"],
    "secondaryContactIds": [23]
  }
}

## Deployment

Hosted on Render.

Endpoint:
https://bitespeed-task-24xs.onrender.com/identify
