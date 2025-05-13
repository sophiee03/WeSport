const mongoose = require('mongoose');
const fs = require('fs');
const yaml = require('js-yaml');

// Carica lo schema da YAML
const schemaData = yaml.load(fs.readFileSync('./components/schemas/avviso.yaml', 'utf8'));

// Crea lo schema Mongoose usando i dati YAML
const avvisoSchema = new mongoose.Schema(schemaData);

const avviso = mongoose.model('avviso', avvisoSchema);

module.exports = avviso;