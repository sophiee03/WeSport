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

// Middleware
app.use(cors());
app.use(express.json());

// Connessione al database MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connesso'))
.catch((err) => console.error('Errore MongoDB:', err));

// Swagger/OpenAPI
const openapiPath = path.join(__dirname, '..', 'WeSport.yaml');
let openapiDocument = {};
try {
  openapiDocument = yaml.load(fs.readFileSync(openapiPath, 'utf8'));
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openapiDocument));
  console.log(`Swagger UI disponibile su http://localhost:${PORT}/api-docs`);
} catch (err) {
  console.error('Errore nel caricamento di WeSport.yaml:', err);
}

app.use('/api/annunci', require('./annuncio/annunci'));
app.use('/api/areasportiva', require('./areasportiva/areasportiva'));
app.use('/api/avvisi', require('./avviso/avvisi'));
app.use('/api/utenteregistrato', require('./utenteregistrato/utenteregistrato'));
app.use('/api/percorsi', require('./percorso/percorsi'));
app.use('/api/segnalazioni', require('./segnalazione/segnalazioni'));
app.use('/api/chat', require('./chats/chat'));
app.use('/api/messaggio', require('./messaggio/messaggio'));
app.use('/api/auth', require('./auth/auth'));

app.listen(PORT, () => {
  console.log(`Server in esecuzione su http://localhost:${PORT}`);
});
