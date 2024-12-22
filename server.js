const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');

const app = express();
const port = 3000;

// Nastavenie body-parser pre spracovanie formulárov
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Cesta k súboru pre ukladanie údajov
const filePath = 'data.json';

// Obrátenie požiadavky na získanie údajov
app.post('/submit', (req, res) => {
    const data = req.body;
    const timestamp = new Date().toISOString();
    const entry = { timestamp, data };

    // Čtenie existujúcich údajov
    let existingData = [];
    if (fs.existsSync(filePath)) {
        existingData = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    }

    // Pridanie nového vstupu
    existingData.push(entry);

    // Ukladanie údajov do súboru
    fs.writeFileSync(filePath, JSON.stringify(existingData, null, 2));

    res.send('Údaje boli úspešne uložené');
});

// Spustenie serveru
app.listen(port, () => {
    console.log(`Server beží na http://localhost:${port}`);
});