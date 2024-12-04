const express = require("express");
const AWS = require("aws-sdk");
const { CognitoUserPool, CognitoUser, AuthenticationDetails } = require("amazon-cognito-identity-js");
const app = express();

app.use(express.json());  // Ermöglicht das Parsen von JSON-Daten

// Konfiguration des Cognito User Pools
const poolData = {
  UserPoolId: "eu-central-1_7xAUfND68",  // Ersetze mit deinem UserPoolId
  ClientId: "555vch1j3fbngob7fue7fn59kv", // Ersetze mit deinem ClientId
};
const userPool = new CognitoUserPool(poolData);

// Benutzeranmeldung (Login)
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  const userData = {
    Username: username,
    Pool: userPool,
  };

  const cognitoUser = new CognitoUser(userData);
  const authenticationDetails = new AuthenticationDetails({
    Username: username,
    Password: password,
  });

  cognitoUser.authenticateUser(authenticationDetails, {
    onSuccess: (result) => {
      res.json({
        message: "Login erfolgreich",
        token: result.getIdToken().getJwtToken(),
      });
    },
    onFailure: (err) => {
      res.status(400).json({ message: "Login fehlgeschlagen", error: err });
    },
  });
});

// Server starten
const port = 5000;
app.listen(port, () => {
  console.log(`Backend läuft auf http://localhost:${port}`);
});
