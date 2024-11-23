const reservationService = require("../services/reservationService");
const {
  reserveTicketSchema,
  getAttendeesByDateSchema,
  cancelReservationSchema,
  modifySeatReservationSchema,
} = require("../validations/reservationSchemas");

exports.reserveTicket = async (req, res, next) => {
  try {
    const { error } = reserveTicketSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const reservationData = req.body;
    const result = await reservationService.reserveTicket(reservationData);
    res.status(201).json({
      message: result.message,
      seatNumber: result.seatNumber,
      eventDate: result.eventDate,
      name: result.name,
      email: result.email,
    });
  } catch (error) {
    next(error);
  }
};

exports.getAttendeesByDate = async (req, res, next) => {
  try {
    const { error } = getAttendeesByDateSchema.validate(req.query);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const { eventDate } = req.query;
    const attendees = await reservationService.getAttendeesByDate(eventDate);
    res.status(200).json(attendees);
  } catch (error) {
    next(error);
  }
};

exports.cancelReservation = async (req, res, next) => {
  try {
    const { error } = cancelReservationSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const { email, eventDate } = req.body;
    const reservation = await reservationService.cancelReservation(email, eventDate);

    // Check if reservation exists
    if (!reservation) {
      return res.status(400).json({ error: "No reservation found to cancel." });
    }

    res.status(200).json({ message: "Reservation cancelled successfully." });
  } catch (error) {
    next(error);
  }
};

exports.modifySeatReservation = async (req, res, next) => {
  try {
    const { error } = modifySeatReservationSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }

    const { email, eventDate, newSeatNumber } = req.body;
    const reservation = await reservationService.modifySeatReservation(
      email,
      eventDate,
      newSeatNumber
    );

    // Check if reservation exists
    if (!reservation) {
      return res.status(400).json({ error: "Reservation not found to modify." });
    }

    res.status(200).json({ message: "Seat reservation modified successfully." });
  } catch (error) {
    next(error);
  }
};

exports.getReservedTicketDetails = async (req, res, next) => {
  try {
    const { email } = req.query;

    if (!email) {
      return res.status(400).json({ error: "Email is required." });
    }

    const reservation = await reservationService.getReservedTicketDetails(
      email
    );
    if (!reservation) {
      return res.status(404).json({ error: "Reservation not found." });
    }

    res.status(200).json(reservation);
  } catch (error) {
    next(error);
  }
};
