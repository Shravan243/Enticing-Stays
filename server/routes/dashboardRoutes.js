const express = require("express");
const Room = require("../models/Room");
const Booking = require("../models/Booking");
const User = require("../models/User");

const router = express.Router();

router.get("/stats", async (req, res) => {
  try {
    const totalRooms = await Room.countDocuments();

    const availableRooms = await Room.countDocuments({
      status: "Available",
    });

    const occupiedRooms = await Room.countDocuments({
      status: "Occupied",
    });

    const totalBookings = await Booking.countDocuments();

    const totalUsers = await User.countDocuments();

    const bookings = await Booking.find({
      status: { $ne: "Cancelled" },
    });

    const revenue = bookings.reduce((sum, item) => {
      return sum + (item.totalAmount || 0);
    }, 0);

    res.json({
      totalRooms,
      availableRooms,
      occupiedRooms,
      totalBookings,
      totalUsers,
      revenue,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to load dashboard stats",
    });
  }
});

module.exports = router;
