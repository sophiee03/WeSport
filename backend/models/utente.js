const mongoose = require('mongoose');

const utenteSchema = new mongoose.Schema({
  
  createdAt: { 
    type: Date,
    default: Date.now 
  }

});

const Utente = mongoose.model('Utente', utenteSchema);

module.exports = Utente;;