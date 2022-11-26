const mongoose = require("mongoose");
const User = mongoose.model("User");
const Team = mongoose.model("Team");
const Schema = mongoose.Schema;

const matchSchema = new Schema({
    home: {
        type: Team,
        required: true,
    },
    away: {
        type: Team,
        required: true,
    },
    
});

module.exports = Match = mongoose.model("Match", matchSchema);