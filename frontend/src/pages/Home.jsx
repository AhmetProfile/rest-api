import React, { useEffect, useState } from "react";
import api from "../api";
import axios from "axios";
import Book from "./Book";

function Home() {
  const [books, setBooks] = useState([]);

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
      <Book key={books.id} books={books} />
    </div>
  );
}

export default Home;
