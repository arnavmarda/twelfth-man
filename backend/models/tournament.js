const mongoose = require("mongoose");
const User = mongoose.model("User");
const Team = mongoose.model("Team");
const Match = mongoose.model("Match");
const Schema = mongoose.Schema;

const tournamentSchema = new Schema({
    teams: {
        type: [Team],
        required: true,
    },
});

module.exports = Tournament = mongoose.model("Tournament", tournamentSchema);
