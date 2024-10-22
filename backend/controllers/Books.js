const Book = require("../models/Books");
const Transaction = require("../models/Transactions");

exports.getAvailableBooks = async (req, res) => {
  try {
    const books = await Book.find({ availability: true });
    res.status(200).json({
      success: true,
      message: "List of available books",
      data: books,
    });
  } catch (err) {
    console.log("Error in getAvailableBooks: ", err);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

exports.getBooks = async (req, res) => {
  try {
    const books = await Book.find({});
    return res.status(200).json({
      success: true,
      message: "List of available books",
      data: books,
    });
  } catch (err) {
    console.log("Error in getAvailableBooks: ", err);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

exports.getBorrowersOfBook = async (req, res) => {
  try {
    const { bookId } = req.params;
    const book = await Transaction.find({ book: bookId }).populate("user");
    res.status(200).json({
      success: true,
      message: "List of borrowers of the book",
      data: book,
    });
  } catch (err) {
    console.log("Error in getBorrowersOfBook: ", err);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

exports.getIssuedBooks = async (req, res) => {
  try {
    const { userId } = req.params;
    if (!userId)
      return res
        .status(400)
        .json({ success: false, message: "Please provide user id" });
    const books = await Transaction.find({ userId: userId }).populate("book");
    return res.status(200).json({
      success: true,
      message: "List of issued books",
      data: books,
    });
  } catch (err) {
    console.log("Error in getIssuedBooks: ", err);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

// In your controllers/Books.js

exports.addBook = async (req, res) => {
  try {
    const { title, author, genre, isbn, description, copies, bookImage } = req.body;    

    if (!title || !author || !copies || !genre || !isbn || !description || !bookImage) {
      return res.status(400).json({
        success: false,
        message: "Please provide all the details including book image URL",
      });
    }

    const bookExists = await Book.findOne({ isbn: isbn });
    if (bookExists) {
      return res.status(400).json({
        success: false,
        message: "Book already exists",
      });
    }

    const book = await Book.create({
      title,
      author,
      genre,
      isbn,
      description,
      copies,
      bookImage, // Save the image URL directly
    });

    res.status(201).json({
      success: true,
      message: "Book added successfully",
      data: book,
    });
  } catch (err) {
    console.log("Error in addBook: ", err);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

exports.updateBook = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, author, genre, isbn, description, copies, bookImage } = req.body;
    const book = await Book.findByIdAndUpdate(
      id,
      {
        title,
        author,
        genre,
        isbn,
        description,
        copies,
        bookImage, // Save the image URL directly
      },
      { new: true }
    );
    if (!book) {
      return res.status(404).json({
        success: false,
        message: "Book not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Book updated successfully",
      data: book,
    });
  } catch (err) {
    console.log("Error in updateBook: ", err);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};


exports.deleteBook = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findByIdAndDelete(id);
    if (!book) {
      return res.status(404).json({
        success: false,
        message: "Book not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Book deleted successfully",
    });
  } catch (err) {
    console.log("Error in deleteBook: ", err);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};

exports.getBookById = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findById(id);
    if (!book) {
      return res.status(404).json({
        success: false,
        message: "Book not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Book retrieved successfully",
      data: book,
    });
  } catch (err) {
    console.log("Error in getBookById: ", err);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
