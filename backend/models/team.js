const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const teamSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    captain: {
        type: String,
        required: true,
    },
    roster: [String],
});

module.exports = Team = mongoose.model("Team", teamSchema);
