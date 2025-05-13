const mongoose = require('mongoose');
const fs = require('fs');
const yaml = require('js-yaml');

// Carica lo schema da YAML
const schemaData = yaml.load(fs.readFileSync('./components/schemas/messaggio.yaml', 'utf8'));

// Crea lo schema Mongoose usando i dati YAML
const messaggioSchema = new mongoose.Schema(schemaData);

const messaggio = mongoose.model('messaggio', messaggioSchema);

module.exports = messaggio;