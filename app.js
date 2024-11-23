const express = require('express');
const cors = require('cors');
const reservationRouter = require('./routes/reservationRoutes');
const Joi = require('joi');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/reservations', reservationRouter);

// Global error handler for invalid Joi validation errors
app.use((err, req, res, next) => {
  if (err instanceof Joi.ValidationError) {
    return res.status(400).json({ error: err.details[0].message });
  }
  next(err); // Pass other errors to the default error handler
});

// Default error handler
app.use((err, req, res, next) => {
  console.error(err);  // Log error
  res.status(500).json({ error: 'Internal Server Error' });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

module.exports = app; // Export app for testing purposes
