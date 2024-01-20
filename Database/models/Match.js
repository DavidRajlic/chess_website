const mongoose = require('mongoose');

const MatchSchema = new mongoose.Schema({
    player1: { type: ObjectID, required: true },
    player2: { type: ObjectID, required: true },
    date: { type: Date, required: true },
    winner: { type: ObjectID, required: true },
});

const Match = mongoose.model('Match', MatchSchema);
module.exports = Match;