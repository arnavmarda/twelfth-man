const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const matchSchema = new Schema({
    home: {
        type: String,
        required: true,
    },
    away: {
        type: String,
        required: true,
    },
    homeRuns: {
        type: Number,
        default: 0,
    },
    awayRuns: {
        type: Number,
        default: 0,
    },
    homeWicketsLost: {
        type: Number,
        default: 0,
    },
    awayWicketsLost: {
        type: Number,
        default: 0,
    },
    homeBowling: [String],
    awayBowling: [String],
});

module.exports = Match = mongoose.model("Match", matchSchema);
