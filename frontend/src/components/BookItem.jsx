import React, { useState } from "react";
import { useSelector } from "react-redux";
import { borrowBook, deleteBook } from "../service/BookOperations";
import { Link } from "react-router-dom";

const BookItem = ({ book }) => {
  const { user, token } = useSelector((state) => state.user);
  const [isModalOpen, setIsModalOpen] = useState(false);

  async function borrow(bookId) {
    try {
      await borrowBook(bookId, user._id, token);
      alert("Book borrowed successfully!");
    } catch (error) {
      alert("Error borrowing book.");
    }
  }

  async function handleDelete(bookId) {
    if (window.confirm("Are you sure you want to delete this book?")) {
      try {
        await deleteBook(bookId, token);
        alert("Book deleted successfully!");
      } catch (error) {
        alert("Error deleting book.");
      }
    }
  }

  return (
    <div className="book-item border-2 border-richYellow bg-gray-700 rounded-lg shadow-lg p-4 flex flex-col items-center transition-transform duration-200 hover:scale-105 ml-4">
      <img src={book.bookImage} alt={book.title} className="w-32 h-48 object-cover mb-2 rounded" />
      <h2 className="font-bold text-lg text-center">{book.title}</h2>
      <p className="text-sm text-center text-gray-300">
        <strong>Author:</strong> {book.author}
      </p>
      <p className="text-sm text-center text-gray-300">
        <strong>Genre:</strong> {book.genre}
      </p>
      
      <div className="mt-2 flex justify-between w-full">
        <button
          onClick={() => borrow(book._id)}
          className="bg-richYellow hover:bg-yellow-400 text-richBlue-100 font-saira text-base font-bold p-1 px-4 rounded-full"
        >
          Borrow
        </button>
        
        <Link to={`/edit-book/${book._id}`}>
          <button className="bg-blue-500 hover:bg-blue-400 text-white font-saira text-base font-bold p-1 px-4 rounded-full">
            Edit
          </button>
        </Link>

        <button
          onClick={() => handleDelete(book._id)}
          className="bg-red-500 hover:bg-red-400 text-white font-saira text-base font-bold p-1 px-4 rounded-full"
        >
          Delete
        </button>
      </div>

      <button
        onClick={() => setIsModalOpen(true)} 
        className="mt-2 text-blue-300 hover:underline"
      >
        View Details
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-5 shadow-lg w-96">
            <h2 className="font-bold text-xl mb-2">{book.title}</h2>
            <img src={book.bookImage} alt={book.title} className="w-full h-48 object-cover mb-3 rounded" />
            <p><strong>Author:</strong> {book.author}</p>
            <p><strong>Genre:</strong> {book.genre}</p>
            <p><strong>Description:</strong> {book.description}</p>
            <button onClick={() => setIsModalOpen(false)} className="mt-3 bg-red-500 text-white px-4 py-2 rounded">Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookItem;
