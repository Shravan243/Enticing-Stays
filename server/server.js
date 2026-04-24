const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");
const errorHandler = require("./middleware/errorMiddleware");

const app = express();
connectDB();

app.use(cors());
app.use(express.json());

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/rooms", require("./routes/roomRoutes"));
app.use("/api/bookings", require("./routes/bookingRoutes"));
app.use("/api/dashboard", require("./routes/dashboardRoutes"));

app.get("/", (req, res) => res.send("Enticing Stays API Running"));

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
