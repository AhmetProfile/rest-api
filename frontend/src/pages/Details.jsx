import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api";
import "../styles/Details.css";

function Details() {
  const { id } = useParams();
  const [books, setBooks] = useState([]);

  useEffect(() => {
    getBooks();
  }, []);

  const navigate = useNavigate();

  const deleteBook = async () => {
    try {
      await api.delete(`/api/books/delete/${id}/`);
      alert("Book deleted successfully");
      navigate("/");
    } catch (error) {
      alert("Error deleting book: " + error.message);
    }
  };

  const getBooks = async () => {
    try {
      const response = await api.get("/api/books/");
      setBooks(response.data);
      console.log(response.data);
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div className="details-wrapper">
      {books
        .filter((book) => book.id === parseInt(id))
        .map((book) => (
          <div className="details-container" key={book.id}>
            <div className="details-image">
              <img src={book.cover} alt={book.name} />
            </div>
            <div className="details-content">
              <h3>{book.name}</h3>
              <p>{book.content}</p>
              <p style={{ fontSize: "20px" }}>
                Author:<b>{book.author}</b>
              </p>
              <button className="details-button" onClick={() => navigate("/")}>
                Return
              </button>
              <br />
              <button className="details-delete" onClick={() => deleteBook()}>
                Delete
              </button>
            </div>
          </div>
        ))}
    </div>
  );
}

export default Details;
