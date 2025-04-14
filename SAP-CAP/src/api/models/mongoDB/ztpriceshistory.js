const mongoose = require('mongoose');

const ztpriceshistorySchema = new mongoose.Schema({
    ID: { type: Number, required: true },
    DATE:   { type: Date, required: true },
    OPEN:   { type: Number, required: true },
    HIGH:   { type: Number, required: true },
    LOW:    { type: Number, required: true },
    CLOSE:  { type: Number, required: true },
    VOLUME: { type: Number, required: true },
});

module.exports = mongoose.model(
    'ZTPRICESHISTORY', 
    ztpriceshistorySchema,
    'ZTPRICESHISTORY'
);