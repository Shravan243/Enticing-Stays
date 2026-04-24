const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema(
  {
    roomNumber: Number,
    type: String,
    price: Number,
    status: {
      type: String,
      default: "Available",
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Room", roomSchema);
