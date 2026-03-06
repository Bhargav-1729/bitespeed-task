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
 "email": "kbhargavreddy22@gmail.com",
 "phoneNumber": "7780540771"
}

### Response

{
    "contact": {
        "primaryContactId": 6,
        "emails": [
            "kbhargavreddy22@gmail.com"
        ],
        "phoneNumbers": [
            "7780479278",
            "7780540771"
        ],
        "secondaryContactIds": [
            7
        ]
    }
}

## Deployment

Hosted on Render.

Endpoint:
https://bitespeed-task-24xs.onrender.com/identify
