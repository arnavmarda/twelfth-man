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
    homeRuns: Number,

    homePlayers: {
        type: [String],
    },

    homeBatsmenRuns: {
        type: [Number],
    },
    
    homeBatsmenBallsFaced: {
        type: [Number],
    },

    homeBowlerRunsGiven: {
        type: [Number],
    },

    homeBowlerBallsBowled: {
        type: [Number],
    },

    homeBowlerWickets: {
        type: [Number],
    },

    homeBowlerExtras: {
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

    awayBatsmenBallsFaced: {
        type: [Number],
    },

    awayBowlerRunsGiven: {
        type: [Number],
    },

    awayBowlerBallsBowled: {
        type: [Number],
    },

    awayBowlerWickets: {
        type: [Number],
    },

    awayBowlerExtras: {
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

    winner: String,
    numOvers: Number,
});

module.exports = Match = mongoose.model("Match", matchSchema);
