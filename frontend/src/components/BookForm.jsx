import React, { useEffect, useState } from "react";
import "../styles/BookForm.css";
import api from "../api";
import { useNavigate } from "react-router-dom";

function BookForm({ method }) {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);
  const [status, setStatus] = useState(false);
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getCategories();
  }, []);

  const getCategories = async () => {
    try {
      const response = await api.get("/api/categories/");
      setCategories(response.data);
      console.log(response.data);
    } catch (error) {
      console.error(
        "Error fetching categories:",
        error.response?.data || error.message,
      );
      alert(error);
    }
  };

  const updateBook = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("content", content);
      if (image) formData.append("cover", image);
      formData.append("status", status);
      if (category) formData.append("category", category);

      const response = await api.put(`/api/books/`, formData);
      if (response.status === 200 || response.status === 201) {
        alert("Book Updated");
        navigate("/");
      } else alert("Failed to Update");
    } catch (error) {
      console.error("Error:", error.response?.data);
      alert("Error: " + JSON.stringify(error.response?.data || error.message));
    }
  };

  const handleSubmit = (e) => {
    if (method === "create") {
      createBook(e);
    } else {
      updateBook(e);
    }
  };

  const createBook = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("name", name);
      formData.append("content", content);
      if (image) formData.append("cover", image);
      formData.append("status", status);
      if (category) formData.append("category", category);

      const response = await api.post("/api/books/", formData);
      if (response.status === 201) {
        alert("Book Created");
        setName("");
        setContent("");
        setImage(null);
        setStatus(false);
        setCategory("");
        navigate("/");
      } else {
        alert("Failed to Create");
      }
    } catch (error) {
      console.error("Error:", error.response?.data);
      alert("Error: " + JSON.stringify(error.response?.data || error.message));
    }
  };

  return (
    <div className="book-form-container">
      <form onSubmit={handleSubmit}>
        <input
          className="book-form-input"
          name="name"
          type="text"
          placeholder="Book Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <textarea
          className="book-form-textarea"
          name="content"
          placeholder="Book Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <input
          className="book-form-input"
          name="cover"
          type="file"
          placeholder="Book Cover"
          onChange={(e) => setImage(e.target.files[0])}
        />
        <div className="book-form-checkbox-group">
          <label htmlFor="status">Have Readed</label>
          <input
            id="status"
            name="status"
            type="checkbox"
            onChange={(e) => setStatus(e.target.checked)}
          />
        </div>
        <label htmlFor="category" className="book-form-label">
          Categories
        </label>
        <select
          id="category"
          className="book-form-select"
          name="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">Select a category</option>
          {categories.map((kategori) => (
            <option key={kategori.id} value={kategori.id}>
              {kategori.name}
            </option>
          ))}
        </select>
        <button className="book-form-button" type="submit">
          {method === "create" ? "Create" : "Update"}
        </button>
      </form>
    </div>
  );
}

export default BookForm;
