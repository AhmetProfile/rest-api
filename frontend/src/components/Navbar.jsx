import React, { useEffect, useState } from "react";
import { FaBook, FaSearch, FaTimes, FaChevronDown } from "react-icons/fa";
import { MdAccountCircle } from "react-icons/md";
import "../styles/Navbar.css";
import api from "../api";
import { useLocation } from "react-router-dom";

function Navbar({ setSelectedCategory, setSearchQuery }) {
  const [user, setUser] = useState(null);
  const [categories, setCategories] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const location = useLocation();
  const isHome = location.pathname === "/";

  useEffect(() => {
    getCategory();
    getUser();
  }, []);

  const getCategory = async () => {
    try {
      const response = await api.get("api/categories");
      console.log(response.data);
      setCategories(response.data);
    } catch (error) {
      console.log(error);
      alert(error);
    }
  };

  const toggleDrawer = (e) => {
    e.preventDefault(); // Stops the logo from navigating to "/"
    setIsDrawerOpen(!isDrawerOpen);
  };

  const getUser = async () => {
    try {
      const response = await api.get("api/user");
      console.log(response.data);
      setUser(response.data);
    } catch (error) {
      console.error(error);
      alert(error);
    }
  };

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  return (
    <>
      {user && isHome && (
        <>
          {isDrawerOpen && (
            <div className="overlay" onClick={() => setIsDrawerOpen(false)} />
          )}
          <div className={`drawer ${isDrawerOpen ? "open" : ""}`}>
            <div className="drawer-header">
              <h3>Menu</h3>
              <FaTimes
                className="close-icon"
                onClick={() => setIsDrawerOpen(false)}
              />
            </div>

            <div className="drawer-content">
              <div className="search-container">
                <input
                  type="text"
                  placeholder="Search..."
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <FaSearch className="search-icon" />
              </div>

              <ul className="categories">
                {categories.map((category) => (
                  <li key={category.id}>
                    <a
                      onClick={(e) => {
                        e.preventDefault();
                        setSelectedCategory(category.name);
                        setIsDrawerOpen(false);
                      }}
                      href="/"
                    >
                      {category.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </>
      )}
      <div className="navbar-container">
        <div className="navbar">
          <ul>
            {isHome ? (
              <li>
                <a onClick={toggleDrawer}>
                  <FaBook className="logo" />
                </a>
              </li>
            ) : (
              <li>
                <a href="/">
                  <FaBook className="logo" />
                </a>
              </li>
            )}
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/about">About</a>
            </li>
            {user && (
              <li>
                <a href="/create">Create</a>
              </li>
            )}
          </ul>
        </div>
        {user && (
          <div
            className="navbar account-section"
            style={{ marginRight: "40px" }}
          >
            <ul>
              <li className="dropdown-container">
                <button className="dropdown-trigger" onClick={toggleDropdown}>
                  <MdAccountCircle className="account-logo" />{" "}
                  <FaChevronDown className="chevron" />
                </button>

                {dropdownOpen && (
                  <div className="dropdown-menu">
                    <a href="/account">Profile</a>
                    <hr />
                    <a href="/logout" className="logout-link">
                      Logout
                    </a>
                  </div>
                )}
              </li>
            </ul>
          </div>
        )}
      </div>
    </>
  );
}

export default Navbar;
