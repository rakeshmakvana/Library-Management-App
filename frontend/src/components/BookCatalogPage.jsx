import React, { useEffect, useState } from 'react';
import { getBooks } from '../service/BookOperations';
import BookItem from './BookItem';

const BookCatalogPage = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchBooks = async () => {
    setLoading(true);
    setError(null);
    try {
      const bookData = await getBooks();
      setBooks(bookData.data);
    } catch (err) {
      setError("Error fetching books");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <div>
      <h1>Book Catalog</h1>
      {loading && <p>Fetching books...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {!loading && !error && books.length > 0 ? (
        <div className="flex flex-wrap pt-28">
          {books.map((book) => (
            <BookItem key={book._id} book={book} />
          ))}
        </div>
      ) : (
        !loading && !error && <p>No books available.</p>
      )}
    </div>
  );
};

export default BookCatalogPage;
