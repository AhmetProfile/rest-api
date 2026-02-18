import React from "react";
import "../styles/Book.css";
import { useNavigate } from "react-router-dom";

function Book({ books }) {
  const navigate = useNavigate();

  const handleLink = (bookId) => {
    navigate(`/details/${bookId}`);
  };

  return (
    <div className="books-surrounder">
      {books.map((book) => (
        <div className="book-container" key={book.id}>
          <div className="book-image">
            <img src={book.cover} width="286" height="180" />
          </div>
          <div className="book-content">
            <h3>{book.name}</h3>
            <p>{book.content.slice(0, 100)}...</p>
            <button
              className="inspect-button"
              onClick={() => handleLink(book.id)}
            >
              İncele
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Book;
