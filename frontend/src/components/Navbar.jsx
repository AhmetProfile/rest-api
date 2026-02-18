import React, { useEffect, useState } from "react";
import { FaBook, FaChevronDown } from "react-icons/fa";
import "../styles/Navbar.css";
import api from "../api";

function Navbar() {
  const [user, setUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    getUser();
  }, []);

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
    <div className="navbar-container">
      <div className="navbar">
        <ul>
          <li>
            <a href="/">
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
        <div className="navbar account-section" style={{ marginRight: "40px" }}>
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
  );
}

export default Navbar;
