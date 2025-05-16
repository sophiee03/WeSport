const mongoose = require('mongoose');

const utenteSchema = new mongoose.Schema({
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('User', userSchema);