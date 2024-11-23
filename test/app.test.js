// test/app.test.js
const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../app");

chai.use(chaiHttp);
const { expect } = chai;

describe("Event Ticket Reservation System", () => {
  describe("POST /api/reservations/reserve", () => {
    it("should return 400 for missing required fields", async () => {
      const res = await chai.request(app).post("/api/reservations/reserve").send({
        email: "johndoe@example.com",
        eventDate: "2024-12-01",
      });
      expect(res).to.have.status(400);
      expect(res.body.error).to.equal('"name" is required');
    });

    it("should return 201 for valid reservation", async () => {
      const res = await chai.request(app).post("/api/reservations/reserve").send({
        name: "John Doe",
        email: "johndoe@example.com",
        eventDate: "2024-12-01",
      });
      expect(res).to.have.status(201);
      expect(res.body).to.have.property("seatNumber");
    });
  });

  describe("GET /api/reservations/attendees", () => {
    it("should return 400 for missing event date", async () => {
      const res = await chai.request(app).get("/api/reservations/attendees");
      expect(res).to.have.status(400);
    });

    it("should return 200 with attendees for valid event date", async () => {
      await chai
        .request(app)
        .post("/api/reservations/reserve")
        .send({
          name: "John Doe",
          email: "johndoe@example.com",
          eventDate: "2024-12-01",
        });

      const res = await chai
        .request(app)
        .get("/api/reservations/attendees")
        .query({ eventDate: "2024-12-01" });

      expect(res).to.have.status(200);
      expect(res.body).to.be.an("array");
      expect(res.body[0]).to.have.property("name", "John Doe");
    });
  });

  describe("POST /api/reservations/cancel", () => {
    it("should return 404 for invalid cancel request", async () => {
      const res = await chai
        .request(app)
        .post("/api/reservations/cancel")
        .send({ email: "johndoe@example.com", eventDate: "2024-12-02" });
      expect(res).to.have.status(404);
    });

  });

  describe("PUT /api/reservations/modify", () => {
    it("should return 400 for invalid modification request", async () => {
      const res = await chai
        .request(app)
        .put("/api/reservations/modify")
        .send({ email: "johndoe@example.com", eventDate: "2024-12-02", newSeatNumber: "A5" });
      expect(res).to.have.status(400);
      expect(res.body.error).to.equal("Reservation not found to modify.");
    });

    it("should return 200 for valid seat modification", async () => {
      await chai
        .request(app)
        .post("/api/reservations/reserve")
        .send({
          name: "John Doe",
          email: "johndoe@example.com",
          eventDate: "2024-12-01",
        });

      const res = await chai
        .request(app)
        .put("/api/reservations/modify")
        .send({ email: "johndoe@example.com", eventDate: "2024-12-01", newSeatNumber: "A5" });

      expect(res).to.have.status(200);
      expect(res.body.message).to.equal("Seat reservation modified successfully.");
    });
  });

  describe("GET /api/reservations/ticket", () => {
    it("should return 400 for missing email", async () => {
      const res = await chai.request(app).get("/api/reservations/ticket");
      expect(res).to.have.status(400);
      expect(res.body.error).to.equal("Email is required.");
    });
  
    it("should return 404 if reservation is not found", async () => {
      const res = await chai
        .request(app)
        .get("/api/reservations/ticket")
        .query({ email: "nonexistent@example.com" });
      expect(res).to.have.status(404);
      expect(res.body.error).to.equal("Reservation not found.");
    });
  
    it("should return 200 for valid email", async () => {
      await chai
        .request(app)
        .post("/api/reservations/reserve")
        .send({
          name: "John Doe",
          email: "johndoe@example.com",
          eventDate: "2024-12-01",
        });
  
      const res = await chai
        .request(app)
        .get("/api/reservations/ticket")
        .query({ email: "johndoe@example.com" });
  
      expect(res).to.have.status(200);
      expect(res.body).to.have.property("name", "John Doe");
      expect(res.body).to.have.property("seatNumber");
      expect(res.body).to.have.property("eventDate");
    });
  });
  
});
