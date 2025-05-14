const mongoose = require('mongoose');
const fs = require('fs');
const yaml = require('js-yaml');

// Carica lo schema da YAML
const schemaData = yaml.load(fs.readFileSync('./components/schemas/segnalazione.yaml', 'utf8'));

// Crea lo schema Mongoose usando i dati YAML
const segnalazioneSchema = new mongoose.Schema(schemaData);

const segnalazione = mongoose.model('segnalazione', segnalazioneSchema);

module.exports = segnalazione;