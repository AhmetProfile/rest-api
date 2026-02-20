import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";
import Navbar from "./components/Navbar";
import BookCreate from "./pages/BookCreate";
import Details from "./pages/Details";
import About from "./pages/About";
import Account from "./pages/Account";
import Update from "./pages/Update";
import Footer from "./components/Footer";

function Logout() {
  localStorage.clear();
  return <Navigate to="/login" />;
}

function RegisterAndLogout() {
  localStorage.clear();
  return <Register />;
}

function App() {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <>
      <BrowserRouter>
        <Navbar
          setSelectedCategory={setSelectedCategory}
          setSearchQuery={setSearchQuery}
        />
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Home
                  selectedCategory={selectedCategory}
                  searchQuery={searchQuery}
                />
              </ProtectedRoute>
            }
          />
          <Route
            path="/create"
            element={
              <ProtectedRoute>
                <BookCreate />
              </ProtectedRoute>
            }
          />
          <Route
            path="/update/:id"
            element={
              <ProtectedRoute>
                <Update />
              </ProtectedRoute>
            }
          />
          <Route
            path="/details/:id"
            element={
              <ProtectedRoute>
                <Details />
              </ProtectedRoute>
            }
          />
          <Route path="/account" element={<Account />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
