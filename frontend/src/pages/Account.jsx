import React, { useEffect, useState } from "react";
import api from "../api";
import "../styles/Account.css";

function Account() {
  const [user, setUser] = useState({});
  const [userName, setUserName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [editingFields, setEditingFields] = useState({
    username: false,
    first_name: false,
    last_name: false,
    email: false,
  });

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    try {
      const response = await api.get("api/user");
      setUser(response.data);
      setUserName(response.data.username || ""); // fixed: was first_name
      setFirstName(response.data.first_name || "");
      setLastName(response.data.last_name || "");
      setEmail(response.data.email || "");
    } catch (error) {
      console.log(error);
      alert(error);
    }
  };

  const toggleEdit = (field) => {
    setEditingFields((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const changeUser = async (e) => {
    e.preventDefault();

    const updatedData = {
      username: userName,
      first_name: firstName,
      last_name: lastName,
      email: email,
    };

    try {
      const response = await api.patch(
        `api/user/update/${user.id}/`,
        updatedData,
      );
      setUser(response.data);
      setEditingFields({
        username: false, // fixed: was "usename"
        first_name: false,
        last_name: false,
        email: false,
      });
      alert("Profile Updated!");
    } catch (error) {
      console.log(error);
      alert(error);
    }
  };

  const editHandle = () => {
    toggleEdit("username");
    toggleEdit("first_name");
    toggleEdit("last_name");
    toggleEdit("email");
  };

  const isEditing =
    editingFields.username || // fixed: was "usename"
    editingFields.first_name ||
    editingFields.last_name ||
    editingFields.email;

  return (
    <div className="account-container">
      <div className="account-header">
        <h1>Welcome Back {user.username}</h1>
      </div>
      <form className="account-form" onSubmit={changeUser}>
        <div className="form-field">
          <h2>Username</h2>
          <div className="field-row">
            {user.username && !editingFields.username ? (
              <h2 className="field-value">{user.username}</h2>
            ) : (
              <input
                type="text"
                value={userName}
                placeholder="Username"
                onChange={(e) => setUserName(e.target.value)}
              />
            )}
          </div>
        </div>

        <div className="form-field">
          <h2>First Name</h2>
          <div className="field-row">
            {user.first_name && !editingFields.first_name ? (
              <h2 className="field-value">{user.first_name}</h2>
            ) : (
              <input
                type="text"
                value={firstName}
                placeholder="First Name"
                onChange={(e) => setFirstName(e.target.value)}
              />
            )}
          </div>
        </div>

        <div className="form-field">
          <h2>Last Name</h2>
          <div className="field-row">
            {user.last_name && !editingFields.last_name ? (
              <h2 className="field-value">{user.last_name}</h2>
            ) : (
              <input
                type="text"
                value={lastName}
                placeholder="Last Name"
                onChange={(e) => setLastName(e.target.value)}
              />
            )}
          </div>
        </div>

        <div className="form-field">
          <h2>Email</h2>
          <div className="field-row">
            {user.email && !editingFields.email ? (
              <h2 className="field-value">{user.email}</h2>
            ) : (
              <input
                type="email"
                value={email}
                placeholder="Email Address"
                onChange={(e) => setEmail(e.target.value)}
              />
            )}
          </div>
        </div>
        <button type="button" className="edit-btn" onClick={editHandle}>
          {editingFields.email ? "Cancel" : "Edit"}
        </button>
        {isEditing && (
          <button className="submit-btn" type="submit">
            Save Changes
          </button>
        )}
      </form>
    </div>
  );
}

export default Account;
