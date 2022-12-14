const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const requireLogin = require("../middleware/requireLogin.js");
const scoring = require("./scoring");

const Team = mongoose.model("Team");
const Match = mongoose.model("Match");

/*
    Fetch a match
*/
router.post("/match/getInfo", (req, res) => {
    const { id } = req.body;
    Match.findOne({ _id: id })
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
router.post("/match/create", (req, res) => {
    const { home, away, numOvers } = req.body;

    if (!home || !away) {
        return res.status(422).json({
            error: "Missing required parameter",
        });
    }

    if (home === away) {
        return res.status(422).json({
            error: "Home team and Away team are the same",
        });
    }

    Team.findOne({ name: home }, (err, resHome) => {
        if (err) {
            console.log(err);
        } else {
            Team.findOne({ name: away }, (err, resAway) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log("HOME: ", resHome.roster);
                    console.log("AWAY: ", resAway.roster);

                    let homeBowling = [];
                    for (let i = 0; i < numOvers; i++) {
                        homeBowling.push("");
                    }

                    let awayBowling = [];
                    for (let i = 0; i < numOvers; i++) {
                        awayBowling.push("");
                    }

                    const newMatch = new Match({
                        home: home,
                        away: away,
                        numOvers: numOvers,
                        homeRuns: 0,
                        homePlayers: resHome.roster,
                        homeBatsmenRuns: new Array(11).fill(0),
                        homeBatsmenBallsFaced: new Array(11).fill(0),
                        homeBowlerRunsGiven: new Array(11).fill(0),
                        homeBowlerBallsBowled: new Array(11).fill(0),
                        homeBowlerWickets: new Array(11).fill(0),
                        homeBowlerExtras: new Array(11).fill(0),
                        homeBowling: homeBowling,
                        homeWicketsLost: 0,
                        awayRuns: 0,
                        awayPlayers: resAway.roster,
                        awayBatsmenRuns: new Array(11).fill(0),
                        awayBatsmenBallsFaced: new Array(11).fill(0),
                        awayBowlerRunsGiven: new Array(11).fill(0),
                        awayBowlerBallsBowled: new Array(11).fill(0),
                        awayBowlerWickets: new Array(11).fill(0),
                        awayBowlerExtras: new Array(11).fill(0),
                        awayBowling: awayBowling,
                        awayWicketsLost: 0,
                    });

                    newMatch
                        .save()
                        .then((match) => res.json(match))
                        .catch((err) => console.log(err));
                }
            });
        }
    });
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

/* 
    Get all matches
*/
router.get("/matchList", (req, res) => {
    Match.find({}, (err, matches) => {
        let matchesList = [];

        matches.forEach((match) => {
            matchesList.push({
                id: match._id,
            });
        });

        res.status(200).json(matchesList);
    })
        .clone()
        .catch((err) => console.log(err));
});

/*
    End a match
*/

router.post("/endMatch", (req, res) => {
    const { id, winner } = req.body;
    Match.findOne({ _id: id })
    .then((foundMatch) => {
        if (!foundMatch) {
            return res.status(422).json({
                error: "No match with this id",
            });
        }
        isMatchOver = foundMatch.isMatchOver;
        winner = foundMatch.winner;
        isMatchOver = true;
        winner = winner;
        
        foundMatch.save();
    })
        .clone()
        .catch((err) => console.log(err));
});

// update runs
router.patch("/match/:id/updateRuns", requireLogin, (req, res) => {
    const { runsToAdd, teamToUpdate, batsmanToUpdate } = req.body;

    teamToUpdate = teamToUpdate.toLowerCase();
    if (teamToUpdate === "home") {
        let indexOfBatsman = homePlayers.indexOf(batsmanToUpdate);
        homeBatsmenRuns[indexOfBatsman] += runsToAdd;

        Match.findOneAndUpdate(
            { _id: req.params.id },
            { homeRuns: { $inc: runsToAdd } },
            { homeBatsmenRuns: homeBatsmenRuns }
        )
            .then((response) => res.status(200).json(response))
            .catch((err) => {
                return res.status(400).json({
                    error: "Error updating runs for home team",
                });
            });
    } else if (teamToUpdate === "away") {
        let indexOfAwayBatsman = awayPlayers.indexOf(batsmanToUpdate);
        awayBatsmenRuns[indexOfAwayBatsman] += runsToAdd;

        Match.findOneAndUpdate(
            { _id: req.params.id },
            { awayRuns: { $inc: runsToAdd } },
            { awayBatsmenRuns: awayBatsmenRuns }
        )
            .then((response) => res.status(200).json(response))
            .catch((err) => {
                return res.status(400).json({
                    error: "Error updating runs for away team",
                });
            });
    } else {
        return res.status(400).json({
            error: "Invalid team (home / away) entered",
        });
    }
});

// update wickets
router.patch("/match/:id/updateWickets", requireLogin, (req, res) => {
    const { wicketsToAdd, teamToUpdate, bowlerToUpdate } = req.body;
    teamToUpdate = teamToUpdate.toLowerCase();
    if (teamToUpdate === "home") {
        let indexOfBowler = homePlayers.indexOf(bowlerToUpdate);
        homeBowlerWickets[indexOfBowler] += wicketsToAdd;
        Match.findOneAndUpdate(
            { _id: req.params.id },
            { homeWicketsLost: { $inc: wicketsToAdd } }
        )
            .then((response) => res.status(200).json(response))
            .catch((err) => {
                return res.status(400).json({
                    error: "Error updating wickets lost by home team",
                });
            });
    } else if (teamToUpdate === "away") {
        let indexOfAwayBowler = awayPlayers.indexOf(bowlerToUpdate);
        awayBowlerWickets[indexOfAwayBowler] += wicketsToAdd;
        Match.findOneAndUpdate(
            { _id: req.params.id },
            { awayWicketsLost: { $inc: wicketsToAdd } }
        )
            .then((response) => res.status(200).json(response))
            .catch((err) => {
                return res.status(400).json({
                    error: "Error updating wickets lost by away team",
                });
            });
    } else {
        return res.status(400).json({
            error: "Invalid team (home / away) entered",
        });
    }
});

// update bowling figures

module.exports = router;