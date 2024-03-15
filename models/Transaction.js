import mongoose, { Schema } from "mongoose";

const TransactionSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  hotelId: {
    type: String,
    required: true,
    ref: "Hotel",
  },
  hotel: {
    type: String,
    required: true,
  },
  rooms: {
    type: [Number],
    required: true,
  },
  roomsId: {
    type: [String],
    required: true,
  },
  dateStart: {
    type: String,
    required: true,
  },
  dateEnd: {
    type: String,
    required: true,
  },
  totalPrice: {
    type: Number,
    required: true,
  },
  payment: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
    default: "Booked",
  },
});

export default mongoose.model("Transaction", TransactionSchema);
