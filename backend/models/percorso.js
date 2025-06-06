const mongoose = require('mongoose');

const percorsoSchema = new mongoose.Schema({
    idPercorso: {
        type: Number,
        required: true
    },

    idCreatore: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UtenteRegistrato',
        required: true,
        description: "id dell'utente che ha inviato il messaggio"
    },

    categoria: {
        type: String,
        enum: ['corsa', 'trekking', 'ciclismo'],
        required: true
    },

    difficolta: Number,
    durata: Number,

    voti: [{
        type: Number
    }],

    numerovoti: Number,
    recensione: Number,
    selfdescription: String,
});

module.exports = mongoose.model('Percorso', percorsoSchema);