const mongoose = require('mongoose');

const sportSchema = new mongoose.Schema({

    tipi: {
        type: string,
        enum: ['calcio', 'basket', 'tennis', 'padel', 'corsa', 'trekking', 'ciclismo', 'pallavolo/beach volley', 'nuoto', 'arrampicata']
    }

    

});

const Sport = mongoose.model('Sport', sportSchema);
module.exports = sport;