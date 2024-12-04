// index.js
import React from "react";
import ReactDOM from "react-dom/client"; // React 18 Syntax
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "react-oidc-context";
import App from "./App";
// import { Buffer } from "buffer"; // Importiere Buffer
import process from "process"; // Importiere process

// Mach Buffer und process global verfügbar
// window.Buffer = Buffer;
window.process = process;

// Konfigurationsobjekt für Cognito
const cognitoAuthConfig = {
  authority: "https://eu-central-19cahdhxyr.auth.eu-central-1.amazoncognito.com", // Ersetze mit deiner Cognito-Authority
  client_id: "5csj2cv1duba1hokdj36b2tba6", // Ersetze mit deinem ClientId
  redirect_uri: "http://localhost:5173/", // Ersetze mit deinem Redirect-URI
  response_type: "code",
  scope: "email openid phone", // Passe die Scopes nach Bedarf an
};

// Verwende React 18's createRoot
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <AuthProvider {...cognitoAuthConfig}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>
);
