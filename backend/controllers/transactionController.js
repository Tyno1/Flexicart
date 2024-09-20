const Transaction = require("../models/transaction");

// Get all transactions
const getAllTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find();
    res.json(transactions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create a new transaction
const createTransaction = async (req, res) => {
  const transaction = new Transaction({
    shopId: req.body.shopId,
    amount: req.body.amount,
    paymentMethod: req.body.paymentMethod,
    items: req.body.items,
  });

  try {
    const newTransaction = await transaction.save();
    res.status(201).json(newTransaction);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Get a specific transaction
const getTransactionById = async (req, res, next) => {
  let transaction;
  try {
    transaction = await Transaction.findById(req.params.id);
    if (transaction == null) {
      return res.status(404).json({ message: "Cannot find transaction" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.transaction = transaction;
  next();
};

module.exports = {
  getAllTransactions,
  createTransaction,
  getTransactionById,
};
