import express from "express";
import {
  createRoom,
  updateRoom,
  deleteRoom,
  getRoom,
  getAllRooms,
  updateRoomAvailability,
} from "../controllers/room.js";
import { verifyAdmin } from "../utils/verifyToken.js";

const router = express.Router();

// CREATE
router.post("/:hotelid", verifyAdmin, createRoom);

// Update
router.put("/:id", verifyAdmin, updateRoom);
router.put("/availability/:id", updateRoomAvailability);

// Delete
router.delete("/:id/:hotelid", verifyAdmin, deleteRoom);

// Get
router.get("/:id", getRoom);

// Get ALL
router.get("/", getAllRooms);

export default router;
