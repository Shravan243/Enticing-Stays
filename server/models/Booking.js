const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    guestName: String,
    email: String,
    phone: String,
    roomId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Room",
    },
    totalAmount: Number,
    invoiceNumber: String,
    status: {
      type: String,
      default: "Booked",
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Booking", bookingSchema);
