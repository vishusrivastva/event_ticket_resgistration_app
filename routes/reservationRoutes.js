const express = require("express");
const reservationController = require("../controllers/reservationController");

const router = express.Router();

// Reserve Event Ticket
router.post(
  "/reserve",
  reservationController.reserveTicket
);

// View All Attendees by Date
router.get(
  "/attendees",
  reservationController.getAttendeesByDate
);

// Cancel Reservation
router.delete(
  "/cancel",
  reservationController.cancelReservation
);

// Modify Reservation
router.put(
  "/modify",
  reservationController.modifySeatReservation
);

// View Reserved Ticket Details by Email
router.get("/ticket", reservationController.getReservedTicketDetails);

module.exports = router;
