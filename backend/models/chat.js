const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({
  idChat: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Annuncio',
    required: true,
    unique: true, // una chat per ogni annuncio
  },
  partecipanti: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  }],
  messaggi: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Messaggio'
  }],
}, { timestamps: true });

module.exports = mongoose.model('Chat', chatSchema);