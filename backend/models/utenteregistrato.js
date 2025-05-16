const mongoose = require('mongoose');


const utenteregistratoSchema = new mongoose.Schema({
  nomeutente: { 
    type: String, 
    unique: true 
    },

  email: {
    type: String,
    required: true,
    unique: true 
  },

  tipo: {
    type: String,
    enum: ['registrato', 'azienda', 'aziendaVer'], // <-- valori permessi
    required: true
  },

  punti: {
    type: int,
    default: 0,
  },

  fotoprofilo: {
    type: String,
    description: "URL della foto del profilo"
  },

  selfdescription: String,

  segnalazioni: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Segnalazione'
  },

  annunci: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Annuncio'
  }
});

const UtenteRegistrato = mongoose.model('UtenteRegistrato', utenteregistratoSchema, 'utenteregistrato');
module.exports = UtenteRegistrato;