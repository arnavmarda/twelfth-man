const mongoose = require("mongoose");
const User = mongoose.model("User");
const Team = mongoose.model("Team");
const Scorecard = mongoose.model("Scorecard")
const Schema = mongoose.Schema;

const matchSchema = new Schema({
    home: {
        type: Team,
        required: true,
    },

    homeScorecard: {
        type: Scorecard,
        required: true,
    },

    away: {
        type: Team,
        required: true,
    },

    awayScorecard: {
        type: Scorecard,
        required: true,
    },
});

module.exports = Match = mongoose.model("Match", matchSchema);
