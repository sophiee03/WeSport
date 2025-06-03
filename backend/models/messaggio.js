const mongoose = require('mongoose');

const messaggioSchema = new mongoose.Schema({
  mittente: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  testo: {
    type: String,
    required: true,
  },
  data: {
    type: Date,
    default: Date.now,
    required: true,
  }
});

module.exports = mongoose.model('Messaggio', messaggioSchema);