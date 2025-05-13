const mongoose = require('mongoose');
const fs = require('fs');
const yaml = require('js-yaml');

// Carica lo schema da YAML
const schemaData = yaml.load(fs.readFileSync('./components/schemas/sport.yaml', 'utf8'));

// Crea lo schema Mongoose usando i dati YAML
const sportSchema = new mongoose.Schema(schemaData);

const sport = mongoose.model('sport', sportSchema);

module.exports = sport;