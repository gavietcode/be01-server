import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import authRoute from "./routes/auth.js";
import usersRoute from "./routes/users.js";
import hotelsRoute from "./routes/hotels.js";
import roomsRoute from "./routes/rooms.js";
import transactionsRoute from "./routes/transactions.js";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();
dotenv.config();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log("Connected to booking data of MongoDB");
  } catch (error) {
    throw error;
  }
};

//MongoDB is disconnected
mongoose.connection.on("disconnected", () => {
  console.log("MongoDB is disconnected!.");
});

// Try to connect mongodb
mongoose.connection.on("connected", () => {
  console.log("MongoDB is disconnected!.");
});

app.get("/", (req, res) => {
  res.send("Home Page API Booking");
});

// Middleware
app.use("/api/auth", authRoute);
app.use("/api/users", usersRoute);
app.use("/api/hotels", hotelsRoute);
app.use("/api/rooms", roomsRoute);
app.use("/api/transactions", transactionsRoute);

// Check error Middleware
app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Somthing went wrong!.";
  return res.status(errorStatus).json({
    success: false,
    status: errorMessage,
    stack: err.stack,
  });
});

app.listen(5000, () => {
  connect(); // When sever run, it will connect to mongodb
  console.log("Server running on port: 5000...");
});
