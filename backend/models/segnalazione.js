const mongoose = require('mongoose');

const segnalazioneSchema = new mongoose.Schema({
  
  idSegnalazione: { 
    type: int,
    required: true 
  },

  data: {
    type: date,
    required: true
  },

  idCreatore: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'UtenteRegistrato',
    required: true,
    description: "id dell'utente che ha inviato il messaggio"
  },

  foto: {
    type: string,
    required: true,
    description: 'url della foto importata/scattata'
  },

  descrizione: String,

  stato: {
    type: string,
    enum: ['accettata', 'elaborazione', 'rifiutata'], 
  }

});

const Segnalazione = mongoose.model('Segnalazione', segnalazioneSchema);

module.exports = Segnalazione;;