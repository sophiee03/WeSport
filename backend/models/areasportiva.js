const mongoose = require('mongoose');

const areasportivaSchema = new mongoose.Schema({
    nome: {
        type: string,
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
        type: boolean,
        required: true
    },
    
    voti: [{
        type: int
    }],

    numerovoti: int,
    recensione: int,
      required:
        - nome
        - zona
        - categoria
        - privata
});

const AreaSportiva = mongoose.model('AreaSportiva', areasportivaSchema);
module.exports = AreaSportiva;
