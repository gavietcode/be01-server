import mongoose from "mongoose";

const RoomSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    maxPeople: {
      type: Number,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    roomNumbers: [{ number: Number, unavailableDates: [{ type: [Date] }] }],
  },
  { timestamps: true }
);

// Example lik to "../models/Hotels"=> rooms:{type:[String]}
// [{ number: 101, unavailableDates: [01.05.2024, 10.05.2024] }];
// [{ number: 102, unavailableDates: [] }];
// [{ number: 103, unavailableDates: [] }];
// [{ number: 104, unavailableDates: [] }];
// [{ number: 105, unavailableDates: [] }];
// [{ number: 105, unavailableDates: [] }];

export default mongoose.model("Room", RoomSchema);
