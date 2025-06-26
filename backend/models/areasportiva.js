const mongoose = require('mongoose');

const areasportivaSchema = new mongoose.Schema({
    nome: {
        type: String,
        required: true
    },
    
    zona: {
        type: String,
        enum: ['Trento Nord', 'Trento Sud', 'Trento Centro', 'Trento Ovest', 'Trento Est'],
        required: true
    },
    
    categoria: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Sport',
        required: true
     },

    selfDescription: String,
    
    privata: {
        type: Boolean,
         required: true
    },
    
    voti: [{
        type: Number
    }],

    numerovoti: Number,
    recensione: Number,

});

module.exports = mongoose.model('AreaSportiva', areasportivaSchema);
