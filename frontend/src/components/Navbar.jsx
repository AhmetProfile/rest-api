import React, { useEffect, useState } from "react";
import { FaBook, FaSearch, FaTimes, FaChevronDown } from "react-icons/fa";
import "../styles/Navbar.css";
import api from "../api";

function Navbar() {
  const [user, setUser] = useState(null);
  const [categories, setCategories] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  useEffect(() => {
    getUser();
    getCategory();
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
            <input type="text" placeholder="Search..." />
            <FaSearch className="search-icon" />
          </div>

          <ul className="categories">
            {categories.map((category) => (
              <li>
                <a href="">{category.name}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="navbar-container">
        <div className="navbar">
          <ul>
            <li>
              <a onClick={toggleDrawer}>
                <FaBook className="logo" />
              </a>
            </li>
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
                  Account <FaChevronDown className="chevron" />
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
