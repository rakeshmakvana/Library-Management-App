const express = require("express");
const router = express.Router();
const {
  borrowBook,
  returnBook,
  getTransactions,
} = require("../controllers/Transactions");

router.get("/getTransactions/get=:userId", getTransactions);
router.post("/borrow", borrowBook);
router.post("/return", returnBook);

module.exports = router;