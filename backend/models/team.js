const mongoose = require("mongoose");
const User = mongoose.model("User");
const Schema = mongoose.Schema;

const teamSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    captain: {
        type: User,
        required: true,
    },
    roster: {
        type: [User],
        required: true,
    },
});

module.exports = Team = mongoose.model("Team", teamSchema);
