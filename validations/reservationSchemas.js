const Joi = require("joi");

exports.reserveTicketSchema = Joi.object({
  name: Joi.string().min(3).required().messages({
    "string.base": "Name must be a string.",
    "string.empty": "Name is required.",
    "string.min": "Name must be at least 3 characters.",
  }),
  email: Joi.string().email().required().messages({
    "string.email": "Invalid email format.",
    "string.empty": "Email is required.",
  }),
  eventDate: Joi.string()
    .regex(/^\d{4}-\d{2}-\d{2}$/)
    .required()
    .messages({
      "string.pattern.base": "Event date must be in YYYY-MM-DD format.",
      "string.empty": "Event date is required.",
    }),
});

exports.getAttendeesByDateSchema = Joi.object({
  eventDate: Joi.string()
    .regex(/^\d{4}-\d{2}-\d{2}$/)
    .required()
    .messages({
      "string.pattern.base": "Event date must be in YYYY-MM-DD format.",
      "string.empty": "Event date is required.",
    }),
});

exports.cancelReservationSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.email": "Invalid email format.",
    "string.empty": "Email is required.",
  }),
  eventDate: Joi.string()
    .regex(/^\d{4}-\d{2}-\d{2}$/)
    .required()
    .messages({
      "string.pattern.base": "Event date must be in YYYY-MM-DD format.",
      "string.empty": "Event date is required.",
    }),
});

exports.modifySeatReservationSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.email": "Invalid email format.",
    "string.empty": "Email is required.",
  }),
  eventDate: Joi.string()
    .regex(/^\d{4}-\d{2}-\d{2}$/)
    .required()
    .messages({
      "string.pattern.base": "Event date must be in YYYY-MM-DD format.",
      "string.empty": "Event date is required.",
    }),
  newSeatNumber: Joi.string().required().messages({
    "string.empty": "New seat number is required.",
  }),
});

exports.getReservedTicketDetailsSchema = Joi.object({
  email: Joi.string().email().required().messages({
    "string.email": "Invalid email format.",
    "string.empty": "Email is required.",
  }),
});
