const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');
const swaggerUi = require('swagger-ui-express');
require('dotenv').config();

process.env.MONGODB_URI = "mongodb://localhost:27017/test";


const app = express();


// Middleware
app.use(cors());
app.use(express.json());

// Connessione al database MongoDB
mongoose.connect(process.env.MONGODB_URI , {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}
)
.then(() => {
  if (process.env.NODE_ENV !== 'test') {
    console.log('MongoDB connesso');
  }
})
.catch((err) => {
  console.error('Errore MongoDB:', err);
  process.exit(1);
});

// Swagger/OpenAPI
const openapiPath = path.join(__dirname, '..', 'WeSport.yaml');
try {
  const openapiDocument = yaml.load(fs.readFileSync(openapiPath, 'utf8'));
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openapiDocument));
  if (process.env.NODE_ENV !== 'test') {
    console.log(`Swagger UI disponibile su http://localhost:${process.env.PORT || 3000}/api-docs`);
  }
} catch (err) {
  console.error('Errore nel caricamento di WeSport.yaml:', err);
}

// Route
app.use('/v1/auth', require('./auth/login_reg'));
app.use('/api/annunci', require('./annuncio/annunci'));
app.use('/api/sport/:sport/areasportiva', require('./areasportiva/areasportiva'));
app.use('/api/avvisi', require('./avviso/avviso'));
app.use('/api/utenteregistrato', require('./utenteregistrato/utenteregistrato'));
app.use('/api/sport/:sport/percorso', require('./percorso/percorso'));
app.use('/api/segnalazioni', require('./segnalazione/segnalazione'));
app.use('/api/chat', require('./chats/chats'));
app.use('/api/messaggio', require('./messaggio/messaggio'));


module.exports = app;
