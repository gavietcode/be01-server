import express from "express";
import {
  deleteUser,
  getAllUsers,
  getCountUsers,
  getUser,
  updateUser,
} from "../controllers/user.js";
import { verifyAdmin, verifyToken, verifyUser } from "../utils/verifyToken.js";

const router = express.Router();

// Get Count
router.get("/countUsers", getCountUsers);

// These codes below, I use for check auth, user and admin

// // Check authentication
// router.get("/checkauthentication", verifyToken, (req, res, next) => {
//   res.send("Hello user, you are logged in!.");
// });

// // Check user
// router.get("/checkuser/:id", verifyUser, (req, res, next) => {
//   res.send("Hello user, you are logged in and you cand delete your account!.");
// });

// // Check admin
// router.get("/checkadmin/:id", verifyAdmin, (req, res, next) => {
//   res.send("Hello admin, you are logged in and you cand delete all account!.");
// });

// Update
router.put("/:id", verifyUser, updateUser);

// Delete
router.delete("/:id", deleteUser);

// Get
router.get("/:id", verifyUser, getUser);

// Get ALL
router.get("/", verifyAdmin, getAllUsers);

export default router;
