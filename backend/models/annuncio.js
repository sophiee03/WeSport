const mongoose = require('mongoose');

const annuncioSchema = new mongoose.Schema({
    
    idAnnuncio:{
        type: String,
        required: true
    },
    idCapogruppo: {
        type: String,
        description: "nomeutente dell'utente che ha creato l'annuncio",
        required: true
    },
    Npersone: {
        type: int,
        required: true
    },
        
    categoria: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Sport',
        required: true
    },

    description: String,
    
    dataOrario: date-time,
    
    iscritti: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UtenteRegistrato',
        description: "ID degli utenti iscritti all'annuncio"
    }],

    visibilita: {
          type: boolean,
          default: true
    }
});

const Annuncio = mongoose.model('Annuncio', annuncioSchema);
module.exports = Annuncio;