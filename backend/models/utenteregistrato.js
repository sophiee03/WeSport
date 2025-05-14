const mongoose = require('mongoose');
const fs = require('fs');
const yaml = require('js-yaml');

// Carica lo schema da YAML
const schemaData = yaml.load(fs.readFileSync('./components/schemas/utenteregistrato.yaml', 'utf8'));

// Crea lo schema Mongoose usando i dati YAML
const utenteregistratoSchema = new mongoose.Schema(schemaData);

const utenteregistrato = mongoose.model('utenteregistrato', utenteregistratoSchema);

module.exports = utenteregistrato;