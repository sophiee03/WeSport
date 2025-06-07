const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');
const swaggerUi = require('swagger-ui-express');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

const BASE_URL = process.env.BASE_URL || `http://localhost:${PORT}`;

// Middleware
app.use(cors());
app.use(express.json());

// Connessione al database MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connesso'))
.catch((err) => {
  console.error('Errore MongoDB:', err);
  process.exit(1); // termina il processo in caso di errore critico
});


// Swagger/OpenAPI
const openapiPath = path.join(__dirname, '..', 'WeSport.yaml');
let openapiDocument = {};
try {
  openapiDocument = yaml.load(fs.readFileSync(openapiPath, 'utf8'));
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openapiDocument));
  console.log(`Swagger UI disponibile su ${BASE_URL}/api-docs`);
} catch (err) {
  console.error('Errore nel caricamento di WeSport.yaml:', err);
}

const login_reg = require('./auth/login_reg');
app.use('/v1/auth', login_reg);

app.use('/api/annunci', require('./annuncio/annunci'));
app.use('/api/areasportiva', require('./areasportiva/areasportiva'));
app.use('/api/avvisi', require('./avviso/avviso'));
app.use('/api/utenteregistrato', require('./utenteregistrato/utenteregistrato'));
app.use('/api/percorsi', require('./percorso/percorso'));
app.use('/api/segnalazioni', require('./segnalazione/segnalazione'));
app.use('/api/chat', require('./chats/chats'));
app.use('/api/messaggio', require('./messaggio/messaggio'));

app.listen(PORT, () => {
  console.log(`Server in esecuzione su ${BASE_URL}`);
});
