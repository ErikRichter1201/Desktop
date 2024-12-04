const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const {
  CognitoIdentityProviderClient,
  SignUpCommand,
  InitiateAuthCommand,
} = require("@aws-sdk/client-cognito-identity-provider");

const app = express();
app.use(bodyParser.json());
app.use(cors()); // Erlaubt den Zugriff von localhost:3000 (Frontend)

// AWS Cognito konfigurieren
const cognitoClient = new CognitoIdentityProviderClient({
  region: "eu-central-1", // Deine Region
});

const CLIENT_ID = "47efd0bgnod0p9p7n9510oin5g"; // Ersetze durch deinen App Client ID

// Registrierung eines Benutzers
app.post("/register", async (req, res) => {
  const { username, password, email } = req.body;

  const params = {
    ClientId: CLIENT_ID,
    Username: username,
    Password: password,
    UserAttributes: [
      {
        Name: "email",
        Value: email,
      },
    ],
  };

  try {
    const command = new SignUpCommand(params);
    await cognitoClient.send(command);
    res.status(200).json({ message: "Benutzer erfolgreich registriert. Überprüfen Sie Ihre E-Mail." });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Anmeldung eines Benutzers
app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const params = {
    AuthFlow: "USER_PASSWORD_AUTH",
    ClientId: CLIENT_ID,
    AuthParameters: {
      USERNAME: username,
      PASSWORD: password,
    },
  };

  try {
    const command = new InitiateAuthCommand(params);
    const response = await cognitoClient.send(command);
    res.status(200).json({
      message: "Login erfolgreich",
      token: response.AuthenticationResult.IdToken,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Backend starten
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Backend läuft auf http://localhost:${PORT}`);
});
