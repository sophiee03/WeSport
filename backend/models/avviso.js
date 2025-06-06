const mongoose = require('mongoose');
const avvisoSchema = new mongoose.Schema({
 
    idAvviso: {
        type: Number,
        required: true
    },
    
    data: {
        type: Date,
        required: true
    },

    categoria: {
         type: String,
         enum:['evento', 'chiusura/manutenzione', 'festival'],
         required: true
    },

    stato: {
        type: String,
          enum: ['in_corso', 'annullato', 'rimandato', 'concluso', 'coming soon']           
    },
      
    testo:  String
});

module.exports = mongoose.model('Avviso', avvisoSchema, 'avviso');