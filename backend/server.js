const express = require('express');
const mongoose = require('mongoose');
const swaggerUi = require('swagger-ui-express');
const fs = require('fs');
const yaml = require('js-yaml');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware per JSON
app.use(express.json());

// Caricamento documentazione Swagger/OpenAPI
const openapiPath = path.join(__dirname, '..', 'WeSport.yaml'); // Assicurati che il file si trovi nella stessa directory del server.js
const openapiDocument = yaml.load(fs.readFileSync(openapiPath, 'utf8'));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openapiDocument));

// Connessione a MongoDB
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('Connesso a MongoDB'))
.catch((err) => console.error('Errore di connessione a MongoDB:', err));

// Funzione per caricare un file YAML in modo sicuro
const loadYAML = (filePath) => {
  try {
    return yaml.load(fs.readFileSync(filePath, 'utf8'));
  } catch (e) {
    console.error(`Errore nel caricare il file YAML da: ${filePath}`, e);
    return null;
  }
};

// Caricamento dei file YAML
const utentiData = loadYAML(path.join(__dirname, 'paths', 'utenti.yaml')); // Assicurati che 'utenti.yaml' sia nella stessa cartella del server.js
const annunciData = loadYAML(path.join(__dirname, 'paths', 'annunci.yaml')); // Assicurati che 'annunci.yaml' sia nella stessa cartella del server.js

// Rotte API per utenti
app.get('/api/v1/utenti', (req, res) => {
  if (utentiData) {
    res.json(utentiData); // Restituisci i dati letti dal file utenti.yaml
  } else {
    res.status(500).json({ error: 'Errore nel caricamento del file utenti.yaml' });
  }
});

// Rotte API per annunci
app.get('/api/v1/annunci', (req, res) => {
  if (annunciData) {
    res.json(annunciData); // Restituisci i dati letti dal file annunci.yaml
  } else {
    res.status(500).json({ error: 'Errore nel caricamento del file annunci.yaml' });
  }
});

// Avvio del server
app.listen(PORT, () => {
  console.log(`Server in esecuzione su http://localhost:${PORT}`);
  console.log(`Swagger UI disponibile su http://localhost:${PORT}/api-docs`);
});
