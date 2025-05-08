const express = require('express');
const swaggerUi = require('swagger-ui-express');
const fs = require('fs');
const yaml = require('js-yaml');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware per JSON
app.use(express.json());

// Caricamento documentazione Swagger/OpenAPI
const openapiPath = path.join(__dirname, 'openapi', 'openapi.yaml');
const openapiDocument = yaml.load(fs.readFileSync(openapiPath, 'utf8'));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openapiDocument));

// Rotte API vere (esempi)
const utentiRoutes = require('./routes/utenti');
const annunciRoutes = require('./routes/annunci');

app.use('/api/v1/utenti', utentiRoutes);
app.use('/api/v1/annunci', annunciRoutes);

// Avvio del server
app.listen(PORT, () => {
  console.log(`Server in esecuzione su http://localhost:${PORT}`);
  console.log(`Swagger UI disponibile su http://localhost:${PORT}/api-docs`);
});