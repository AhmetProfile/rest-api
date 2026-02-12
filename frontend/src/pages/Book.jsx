import React from "react";

function Book({ books }) {
  return (
    <div>
      {books.map((book) => (
        <div key={book.id}>
          <div>
            <img src={book.cover} />
          </div>
          <div>
            <h3>{book.name}</h3>
            <p>{book.content.slice(0, 100)}...</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Book;
