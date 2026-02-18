import { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import "../styles/Form.css";

function Form({ route, method }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const name = method === "login" ? "Login" : "Register";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (method === "register" && password !== confirmPassword) {
      alert("Passwords do not match");
      setLoading(false);
      return;
    }

    try {
      const res = await api.post(route, { username, password });
      if (method === "login") {
        localStorage.setItem(ACCESS_TOKEN, res.data.access);
        localStorage.setItem(REFRESH_TOKEN, res.data.access);
        navigate("/");
      } else {
        navigate("/login");
      }
    } catch (error) {
      alert(error);
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <h1>{name} </h1>
      <input
        type="text"
        value={username}
        placeholder="Username"
        className="form-input"
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        value={password}
        placeholder="Password"
        className="form-input"
        onChange={handlePasswordChange}
      />
      {method === "login" ? (
        <h4 className="form-toggle">
          <a className="form-link" onClick={() => navigate("/register")}>
            Dont Have An Account?
          </a>
        </h4>
      ) : (
        <>
          <input
            type="password"
            value={confirmPassword}
            placeholder="Confirm Password"
            className="form-input"
            onChange={handleConfirmPassword}
          />
          <h4 className="form-toggle">
            <a className="form-link" onClick={() => navigate("/login")}>
              Already Have An Account?
            </a>
          </h4>
        </>
      )}

      <button
        className="form-button"
        type="submit"
        disabled={method === "register" && password !== confirmPassword}
        style={
          method === "register" && password !== confirmPassword
            ? { backgroundColor: "darkblue" }
            : null
        }
      >
        {name}
      </button>
    </form>
  );
}

export default Form;
