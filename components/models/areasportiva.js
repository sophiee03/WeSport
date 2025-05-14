const mongoose = require('mongoose');
const fs = require('fs');
const yaml = require('js-yaml');

// Carica lo schema da YAML
const schemaData = yaml.load(fs.readFileSync('./components/schemas/areesportive.yaml', 'utf8'));

// Crea lo schema Mongoose usando i dati YAML
const areesportiveSchema = new mongoose.Schema(schemaData);

const SportFacility = mongoose.model('areesportive', areesportiveSchema);

module.exports = areesportive;
