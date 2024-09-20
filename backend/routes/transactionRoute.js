const express = require("express");
const router = express.Router();
const transactionController = require("../controllers/transactionController");
const authMiddleware = require("../middlewares/auth");

// Get all transactions
router.get("/", transactionController.getAllTransactions);

// Create a new transaction
router.post("/", authMiddleware, transactionController.createTransaction);

// Get a specific transaction
router.get("/:id", transactionController.getTransactionById, (req, res) => {
  res.json(res.transaction);
});

module.exports = router;
