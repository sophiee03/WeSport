const mongoose = require('mongoose');
const fs = require('fs');
const yaml = require('js-yaml');

// Carica lo schema da YAML
const schemaData = yaml.load(fs.readFileSync('./components/schemas/annuncio.yaml', 'utf8'));

// Crea lo schema Mongoose usando i dati YAML
const annuncioSchema = new mongoose.Schema(schemaData);

const annuncio = mongoose.model('annuncio', annuncioSchema);

module.exports = annuncio;