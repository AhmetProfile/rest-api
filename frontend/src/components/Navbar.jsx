import React from "react";
import { FaBook } from "react-icons/fa";
import "../styles/Navbar.css";

function Navbar() {
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
          <li>
            <a href="/create">Create</a>
          </li>
        </ul>
      </div>
      <div className="navbar" style={{ marginRight: "40px" }}>
        <ul>
          <li>
            <a href="">Account</a>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Navbar;
