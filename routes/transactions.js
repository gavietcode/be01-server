import express from "express";
import {
  createTransaction,
  getBalance,
  getCountTrans,
  getEarning,
  getLatestTransaction,
  getTransaction,
  getTransactionUser,
} from "../controllers/transaction.js";
import { verifyAdmin, verifyToken, verifyUser } from "../utils/verifyToken.js";

const router = express.Router();

// Balance
router.get("/balance", getBalance);

// Earn
router.get("/earning", getEarning);

// Count
router.get("/countTrans", getCountTrans);

// Count
router.get("/latest", verifyAdmin, getLatestTransaction);

// User
router.get("/:username", getTransactionUser);

// CREATE
router.post("/", createTransaction);

// Get ALL
router.get("/", verifyAdmin, getTransaction);

export default router;
