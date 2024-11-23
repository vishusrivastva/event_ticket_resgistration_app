# Event Ticket Reservation System API

This project provides an API for managing reservations, including functionalities for reserving tickets, modifying seat assignments, canceling reservations, and fetching reservation details.

## Features

- Reserve a ticket
- Modify seat reservation
- Cancel a reservation
- Get reserved ticket details
- Get attendees by event date

## Tech Stack

- **Node.js**: JavaScript runtime for building the server
- **Express.js**: Web framework for building the API
- **Joi**: For request validation
- **In-memory Database**: Simple in-memory array to store reservations (can be replaced with a database in production)
- **Mocha & Chai**: For testing API endpoints

## Setup Instructions

Follow these steps to get the project running locally:

### 1. Clone the repository

```bash
git clone https://github.com/vishusrivastva/event_ticket_resgistration_app.git
cd event_ticket_resgistration_app
```

### 2. Install dependencies
Make sure you have Node.js installed. Then, run:
```bash
npm install
```
This will install all the required dependencies.

### 3. Run the application
To start the server, run the following command:
```bash
npm start
```
By default, the API will run on http://localhost:3000.

### 4. Test the API
You can test the API endpoints using Postman or cURL. Here's a brief overview of the available routes:

- POST /api/reservations/reserve: Reserve a ticket.
- GET /api/reservations/attendees: Get attendees for a specific event date.
- DELETE /api/reservations/cancel: Cancel a reservation.
- PUT /api/reservations/modify: Modify a seat reservation.
- GET /api/reservations/ticket: Get reserved ticket details by email.

### 5. Run Tests
To run the unit tests for the API, use the following command:

```bash
npm test
```
This will run the Mocha tests for the API and validate the functionality.

### 6. Import Postman Collection
To import postman collection there is a file named `Event Ticket Reservation System.postman_collection.json` import this file into postman and simply run the APIs
