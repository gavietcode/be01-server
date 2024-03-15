import mongoose from "mongoose";
import Transaction from "../models/Transaction.js";
import Hotel from "../models/Hotel.js";

export const createTransaction = async (req, res, next) => {
  console.log(req.body);
  const { hotels, ...others } = req.body;
  // const hotelId = mongoose.Types.ObjectId(hotels);
  const hotelId = hotels;
  const hotel = await Hotel.findById(hotelId);
  const transaction = new Transaction({
    hotelId: hotelId,
    hotel: hotel.name,
    ...others,
  });
  try {
    const saveTransaction = await transaction.save();
    res.status(200).json(saveTransaction);
  } catch (err) {
    next(err);
  }
};

export const getTransaction = async (req, res, next) => {
  try {
    const transactions = await Transaction.find();
    res.status(200).json(transactions);
  } catch (err) {
    next(err);
  }
};

export const getTransactionUser = async (req, res, next) => {
  const username = req.params.username;
  try {
    const transactionUser = await Transaction.find({ username: username });
    res.status(200).json(transactionUser);
  } catch (err) {
    next(err);
  }
};

export const getBalance = async (req, res, next) => {
  const countTrans = await Transaction.find();
  try {
    const earning = countTrans.reduce(
      (total, item) => total + item.totalPrice,
      0
    );

    const balance = earning / countTrans.length;

    res.status(200).json(balance);
  } catch (err) {
    next(err);
  }
};

export const getEarning = async (req, res, next) => {
  const countTrans = await Transaction.find();
  try {
    const earning = countTrans.reduce(
      (total, item) => total + item.totalPrice,
      0
    );

    res.status(200).json(earning);
  } catch (err) {
    next(err);
  }
};

export const getCountTrans = async (req, res, next) => {
  try {
    const countTrans = await Transaction.countDocuments();
    res.status(200).json(countTrans);
  } catch (err) {
    next(err);
  }
};

export const getLatestTransaction = async (req, res, next) => {
  const username = req.params.username;
  try {
    const transactions = await Transaction.find();
    const latestTrans = transactions.slice(-8).reverse();
    res.status(200).json(latestTrans);
  } catch (err) {
    next(err);
  }
};
