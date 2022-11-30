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

    homePlayers: {
        type: [String],
    },

    homeBatsmenRuns: {
        type: [Number],
    },

    homeBowlerWickets: {
        type: [Number],
    },

    awayRuns: {
        type: Number,
        default: 0,
    },

    awayPlayers: {
        type: [String],
    },

    awayBatsmenRuns: {
        type: [Number],
    },

    awayBowlerWickets: {
        type: [Number],
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

    isMatchOver: {
        type: Boolean,
        default: false,
    },

    winner: {
        type: String,
    }
});

module.exports = Match = mongoose.model("Match", matchSchema);
