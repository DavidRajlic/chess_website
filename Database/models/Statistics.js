const mongoose = require('mongoose');

const StatisticsSchema = new mongoose.Schema({
    player: { type: ObjectID, required: true },
    wins: { type: Number, required: true },
    losses: { type: Number, required: true },
    draws: { type: Number, required: true },
});

const Statistics = mongoose.model('Statistics', StatisticsSchema);
module.exports = Statistics;