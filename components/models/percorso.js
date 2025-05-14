const mongoose = require('mongoose');
const fs = require('fs');
const yaml = require('js-yaml');

// Carica lo schema da YAML
const schemaData = yaml.load(fs.readFileSync('./components/schemas/percorso.yaml', 'utf8'));

// Crea lo schema Mongoose usando i dati YAML
const percorsoSchema = new mongoose.Schema(schemaData);

const percorso = mongoose.model('percorso', percorsoSchema);

module.exports = percorso;