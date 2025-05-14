const mongoose = require('mongoose');
const fs = require('fs');
const yaml = require('js-yaml');

// Carica lo schema da YAML
const schemaData = yaml.load(fs.readFileSync('./components/schemas/azienda.yaml', 'utf8'));

// Crea lo schema Mongoose usando i dati YAML
const aziendaSchema = new mongoose.Schema(schemaData);

const azienda = mongoose.model('azienda', aziendaSchema);

module.exports = azienda;