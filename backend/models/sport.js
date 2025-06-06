const mongoose = require('mongoose');

const sportSchema = new mongoose.Schema({
    tipi: {
        type: String,
        enum: ['calcio', 'basket', 'tennis', 'padel', 'corsa', 'trekking', 'ciclismo', 'pallavolo/beach volley', 'nuoto', 'arrampicata']
    }
});

module.exports = mongoose.model('Sport', sportSchema);