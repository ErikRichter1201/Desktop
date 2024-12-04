// src/Register.js
import React, { useState } from "react";
import { auth } from "./firebase"; // Firebase auth importieren
import { createUserWithEmailAndPassword } from "firebase/auth";

function RegisterForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log("Benutzer registriert:", userCredential.user);
    } catch (error) {
      console.error("Fehler bei der Registrierung:", error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        placeholder="E-Mail"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Passwort"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button type="submit">Registrieren</button>
    </form>
  );
}

export default RegisterForm;
