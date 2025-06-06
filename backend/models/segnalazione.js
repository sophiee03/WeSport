const mongoose = require('mongoose');

const segnalazioneSchema = new mongoose.Schema({
  
  idSegnalazione: { 
    type: Number,
    required: true 
  },

  data: {
    type: Date,
    required: true
  },

  idCreatore: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'UtenteRegistrato',
    required: true,
    description: "id dell'utente che ha inviato il messaggio"
  },

  foto: {
    type: String,
    required: true,
    description: 'url della foto importata/scattata'
  },

  descrizione: String,

  stato: {
    type: String,
    enum: ['accettata', 'in elaborazione', 'rifiutata'], 
  }

});

module.exports = mongoose.model('Segnalazione', segnalazioneSchema);