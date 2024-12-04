import React, { useState } from "react";
import axios from "axios";

const LoginForm = () => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [message, setMessage] = useState("");
  const [token, setToken] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/login", formData);
      setMessage(response.data.message);
      setToken(response.data.token); // Token speichern
    } catch (error) {
      setMessage("Fehler: " + error.response?.data?.error || error.message);
    }
  };

  return (
    <div>
      <h2>Anmelden</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Benutzername"
          value={formData.username}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Passwort"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button type="submit">Anmelden</button>
      </form>
      {message && <p>{message}</p>}
      {token && (
        <div>
          <h3>Token:</h3>
          <textarea
            readOnly
            value={token}
            rows="5"
            style={{ width: "100%" }}
          ></textarea>
        </div>
      )}
    </div>
  );
};

export default LoginForm;
