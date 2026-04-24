const Room = require("../models/Room");

exports.getRooms = async (req, res) => {
  const rooms = await Room.find().sort({ roomNumber: 1 });
  res.json(rooms);
};

exports.createRoom = async (req, res) => {
  const room = await Room.create(req.body);
  res.status(201).json(room);
};

exports.updateRoom = async (req, res) => {
  await Room.findByIdAndUpdate(req.params.id, req.body);
  res.json({ message: "Room updated" });
};

exports.deleteRoom = async (req, res) => {
  await Room.findByIdAndDelete(req.params.id);
  res.json({ message: "Room deleted" });
};
