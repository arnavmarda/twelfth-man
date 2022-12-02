const mongoose = require("mongoose");
const User = mongoose.model("User");
const Team = mongoose.model("Team");
const Match = mongoose.model("Match");
const Schema = mongoose.Schema;

const tournamentSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    teams: {
        type: [String],
        required: true,
    },
    numTeams: {
        type: Number,
        required: true,
    },
    standings: {
        type: [String],
    },
    fixtures: {
        type: [String],
    },
});

module.exports = Tournament = mongoose.model("Tournament", tournamentSchema);
