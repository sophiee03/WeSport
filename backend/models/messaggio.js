const mongoose = require('mongoose');

const messaggioSchema = new mongoose.Schema({

    data: {
        type: Date,
        required: true
    },

    mittente: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UtenteRegistrato',
        required: true,
        description: "id dell'utente che ha inviato il messaggio"
    },
    
    testo: String
});

const Messaggio = mongoose.model('Messaggio', messaggioSchema);
module.exports = Messaggio;