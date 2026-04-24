const express = require("express");
const mongoose = require("mongoose");
const Booking = require("../models/Booking");
const Room = require("../models/Room");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const data = await Booking.find().populate("roomId");
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch bookings" });
  }
});

router.post("/", async (req, res) => {
  try {
    const { guestName, email, phone, roomId } = req.body;

    if (!guestName || !email || !roomId) {
      return res.status(400).json({ message: "Required fields missing" });
    }

    if (!mongoose.Types.ObjectId.isValid(roomId)) {
      return res.status(400).json({ message: "Invalid room id" });
    }

    const room = await Room.findById(roomId);

    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }

    if (room.status === "Occupied") {
      return res.status(400).json({ message: "Room already occupied" });
    }

    const booking = await Booking.create({
      guestName,
      email,
      phone,
      roomId,
      totalAmount: room.price,
      invoiceNumber: "INV-" + Date.now(),
    });

    room.status = "Occupied";
    await room.save();

    res.status(201).json({
      message: "Booking created",
      booking,
    });
  } catch (error) {
    res.status(500).json({ message: "Booking failed" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    await Room.findByIdAndUpdate(booking.roomId, {
      status: "Available",
    });

    await Booking.findByIdAndDelete(req.params.id);

    res.json({ message: "Booking deleted" });
  } catch (error) {
    res.status(500).json({ message: "Delete failed" });
  }
});

module.exports = router;
