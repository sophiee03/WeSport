const mongoose = require('mongoose');
const fs = require('fs');
const yaml = require('js-yaml');

// Carica lo schema da YAML
const schemaData = yaml.load(fs.readFileSync('./components/schemas/chat.yaml', 'utf8'));

// Crea lo schema Mongoose usando i dati YAML
const chatSchema = new mongoose.Schema(schemaData);

const chat = mongoose.model('chat', chatSchema);

module.exports = chat;