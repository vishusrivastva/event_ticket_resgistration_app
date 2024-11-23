let reservations = []; // In-memory data for simplicity

// Function to handle ticket reservation
exports.reserveTicket = async (reservationData) => {
  const seatNumber = `A${reservations.length + 1}`; // Simple seat assignment logic
  reservations.push({ ...reservationData, seatNumber });

  return {
    message: "Reservation successful",
    seatNumber,
    eventDate: reservationData.eventDate,
    name: reservationData.name,
    email: reservationData.email,
  };
};

// Function to get attendees by event date
exports.getAttendeesByDate = async (eventDate) => {
  const attendees = reservations.filter(
    (reservation) => reservation.eventDate === eventDate
  );

  if (attendees.length === 0) {
    throw new Error("No attendees found for the given event date.");
  }

  return attendees;
};

// Function to cancel a reservation
exports.cancelReservation = async (email, eventDate) => {
  const index = reservations.findIndex(
    (reservation) => reservation.email === email && reservation.eventDate === eventDate
  );

  if (index === -1) {
    return null; // Return null if no reservation is found
  }

  reservations.splice(index, 1);
  return { message: "Reservation cancelled successfully." };
};

// Function to modify a seat reservation
exports.modifySeatReservation = async (email, eventDate, newSeatNumber) => {
  const reservation = reservations.find(
    (reservation) => reservation.email === email && reservation.eventDate === eventDate
  );

  if (!reservation) {
    return null; // Return null if no reservation is found
  }

  reservation.seatNumber = newSeatNumber;
  return { message: "Seat reservation modified successfully." };
};

// Function to get reserved ticket details by email
exports.getReservedTicketDetails = async (email) => {
  const reservation = reservations.find((reservation) => reservation.email === email);

  if (!reservation) {
    return null; // Return null if reservation is not found
  }

  return reservation;
};
