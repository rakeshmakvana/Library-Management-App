const Transactions = require("../models/Transactions");
const Users = require("../models/User");
const Book = require("../models/Books");

exports.borrowBook = async (req, res) => {
  try {
    const { userId, bookId } = req.body;
    if (!userId || !bookId) {
      return res.status(400).json({
        success: false,
        message: "Please provide all the details",
      });
    }

    const user = await Users.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({
        success: false,
        message: "Book not found",
      });
    }

    if (book.availability === false) {
      return res.status(400).json({
        success: false,
        message: "Book is not available",
      });
    }

    const borrowedBook = await Transactions.findOne({
      book: bookId,
      userId: userId,
    });
    if (borrowedBook) {
      return res.status(400).json({
        success: false,
        message: "You have already borrowed this book",
      });
    }

    const transaction = new Transactions({
      userId: userId,
      book: bookId,
    });
    await transaction.save();

    const updatedBook = await Book.findByIdAndUpdate(
      bookId,
      { $inc: { issued: 1 } },
      {
        new: true,
      }
    );
    if (updatedBook.issued === updatedBook.copies) {
      updatedBook.availability = false;
      await updatedBook.save();
    }
    return res.status(200).json({
      success: true,
      message: "Book borrowed successfully",
    });
  } catch (err) {
    console.log("Error borrowing the book : ", err);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: err,
    });
  }
};

exports.returnBook = async (req, res) => {
  try {
    const { userId, bookId } = req.body;
    if (!userId || !bookId) {
      return res.status(400).json({
        success: false,
        message: "Please provide all the details",
      });
    }

    const user = await Users.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const book = await Book.findById(bookId);
    if (!book) {
      return res.status(404).json({
        success: false,
        message: "Book not found",
      });
    }

    const borrowedBook = await Transactions.findOne({
      userId: userId,
      book: bookId,
    });
    if (!borrowedBook) {
      return res.status(400).json({
        success: false,
        message: "You have not borrowed this book",
      });
    }

    const returnedBook = await Transactions.findByIdAndUpdate(
      borrowedBook._id,
      (returnedDate = Date.now()),
      { new: true }
    );

    const updatedBook = await Book.findByIdAndUpdate(
      bookId,
      { $inc: { issued: -1 } },
      { new: true }
    );
    if (updatedBook.issued < updatedBook.copies) {
      updatedBook.availability = true;
      await updatedBook.save();
    }
    return res.status(200).json({
      success: true,
      message: "Book returned successfully",
    });
  } catch (err) {
    console.log("Error returning the book : ", err.message);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: err,
    });
  }
};

exports.getTransactions = async (req, res) => {
  try {
    const { userId } = req.params;
    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "Please provide all the details",
      });
    }

    const user = await Users.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const transactions = await Transactions.find({ user: userId })
      .sort(-1)
      .populate("book");
    return res.status(200).json({
      success: true,
      message: "Transactions fetched successfully",
      data: transactions,
    });
  } catch (err) {
    console.log("Error getting the transactions : ", err.message);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: err,
    });
  }
};
