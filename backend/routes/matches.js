const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const requireLogin = require("../middleware/requireLogin.js");

const Team = mongoose.model("Team");
const Match = mongoose.model("Match");

/*
    Fetch a match
*/
router.get("/match/:id", (req, res) => {
    Match.findOne({ _id: req.params.id })
        .then((match) => res.status(200).json(match))
        .catch((err) => {
            return res.status(400).json({
                error: "Couldn't find match with given ID",
            });
        });
});

/*
    Create a match
*/
router.post("/match/create", requireLogin, (req, res) => {
    const { home, away } = req.body;
    if (!home || !away) {
        return res.status(422).json({
            error: "Missing required parameter",
        });
    }

    Team.findOne({ name: home })
        .then((team) => {
            if (!team) {
                return res.status(400).json({
                    error: "No team found with name " + home,
                });
            }
        })
        .catch((err) => console.log(err));

    Team.findOne({ name: away })
        .then((team) => {
            if (!team) {
                return res.status(400).json({
                    error: "No team found with name " + away,
                });
            }
        })
        .catch((err) => console.log(err));

    const newMatch = new Match({
        home: home,
        away: away,
    });

    newMatch
        .save()
        .then((match) => res.json(match))
        .catch((err) => console.log(err));
});

/*
    Delete a match
*/
router.delete("/match/delete/:id", requireLogin, (req, res) => {
    Match.findOneAndDelete({ _id: req.params.id })
        .then((response) => res.status(200).json(response))
        .catch((err) => {
            return res.status(400).json({
                error: "Error deleting match",
            });
        });
});

module.exports = router;