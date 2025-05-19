const mongoose = require('mongoose');

const chatSchema = new mongoose.Schema({

    annuncioId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Annuncio',
        required: true,
        unique: true
    },

    partecipanti: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UtenteRegistrato'
    }],
    
    messaggi: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Messaggio'
    }]
        

});

const Chat = mongoose.model('Chat', chatSchema);
module.exports = Chat;