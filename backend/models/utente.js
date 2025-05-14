const mongoose = require('mongoose');
const fs = require('fs');
const yaml = require('js-yaml');

// Carica lo schema da YAML
const schemaData = yaml.load(fs.readFileSync('./components/schemas/utente.yaml', 'utf8'));

// Crea lo schema Mongoose usando i dati YAML
const utenteSchema = new mongoose.Schema(schemaData);

const utente = mongoose.model('utente', utenteSchema);

module.exports = utente;

/*  
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema);

secret2FA: { type: String }, // segreto per Google Authenticator
is2FAEnabled: { type: Boolean, default: false }*/