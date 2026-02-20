import React, { useEffect, useState } from "react";
import api from "../api";
import axios from "axios";
import Book from "./Book";
import "../styles/Home.css";

function Home({ selectedCategory, searchQuery }) {
  const [books, setBooks] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = 10;
  const start = (currentPage - 1) * booksPerPage;
  const end = start + booksPerPage;
  const filteredBooks = books
    .filter((book) =>
      selectedCategory ? book.category.name === selectedCategory : true,
    )
    .filter((book) =>
      searchQuery
        ? book.name.toLowerCase().includes(searchQuery.toLowerCase())
        : true,
    );

  const totalPages = Math.ceil(filteredBooks.length / booksPerPage);
  const paginatedBooks = filteredBooks.slice(start, end);

  useEffect(() => {
    getBooks();
  }, []);

  const getBooks = async () => {
    try {
      const response = await api.get("/api/books/");
      setBooks(response.data);
      console.log(response.data);
    } catch (error) {
      console.error(
        "Error fetching books:",
        error.response?.data || error.message,
      );
      alert(error);
    }
  };

  return (
    <div>
      <Book books={paginatedBooks} />
      <div className="pagination-container">
        <button
          className="pagination-button"
          onClick={() => setCurrentPage((p) => p - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span className="pagination-info">
          {currentPage} / {totalPages}
        </span>
        <button
          className="pagination-button"
          onClick={() => setCurrentPage((p) => p + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Home;
