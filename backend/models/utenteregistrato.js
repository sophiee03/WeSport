const mongoose = require('mongoose');

const utenteregistratoSchema = new mongoose.Schema({
  nomeutente: { 
    type: String,
    required: true, 
    unique: true 
    },
  
  password: {
    type: String,
    required: true
  },

  email: {
    type: String,
    //required: true,
    unique: true 
  },

  tipo: {
    type: String,
    enum: ['utente', 'azienda', 'aziendaVer'],
    //required: true
  },

  punti: {
    type: Number,
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

  percorsi: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Percorso',
  }],

  annunci: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Annuncio'
  }
});

module.exports = mongoose.model('UtenteRegistrato', utenteregistratoSchema);