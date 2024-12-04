const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const logFilePath = path.join(__dirname, 'logs', 'andere_logdatei.log');

app.get('/andereLogRoute', (req, res) => {
    const message = `Aufruf der Route: ${new Date().toISOString()}\n`;
    fs.appendFile(logFilePath, message, (err) => {
        if (err) {
            return res.status(500).send('Fehler beim Schreiben in die Log-Datei.');
        }
        res.send('Log-Eintrag hinzugefügt.');
    });
});
