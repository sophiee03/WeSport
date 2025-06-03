const mongoose = require('mongoose');

const percorsoSchema = new mongoose.Schema({
    idPercorso: {
        type: int,
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

    difficolta: int,
    durata: int,

    voti: [{
        type: int
    }],

    numerovoti: int,
    recensione: int,
    selfdescription: String,
});

module.exports = mongoose.model('Percorso', percorsoSchema);