const express = require("express");
const router = express.Router();
const {
  getAvailableBooks,
  getBorrowersOfBook,
  addBook,
  getBooks,
  getIssuedBooks,
  updateBook,  
  deleteBook,
  getBookById, 
} = require("../controllers/Books");

router.get("/getAvailableBooks", getAvailableBooks);
router.get("/get=:bookId", getBorrowersOfBook);
router.get("/getBooks", getBooks);
router.post("/addBook", addBook);
router.get("/getIssuedBooks/get=:userId", getIssuedBooks);
router.put("/updateBook/:id", updateBook); 
router.delete("/deleteBook/:id", deleteBook);
router.get("/getBookById/:id", getBookById);

module.exports = router;
