const mongoose = require('mongoose');
const avvisoSchema = new mongoose.Schema({
 
    idAvviso: {
        type: int,
        required: true
    },
    
    data: {
        type: date,
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

const Avviso = mongoose.model('Avviso', avvisoSchema, 'avviso');
module.exports = Avviso;