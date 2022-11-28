
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const scorecardSchema = new Schema({

    runs: {
        type: Number,
        required: true,
    },

    wickets: {
        type: Number,
        required: true,
    },

    overs: {
        type: Number,
        required: true,
    },

    battingFirst: {
        type: Boolean,
        required: true,
    },
});

module.exports = Scorecard = mongoose.model("Scorecard", scorecardSchema);
