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
        homeBatsmen: home.roster,
        awayBatsmen: away.roster,
        homeBatsmenRuns: Array.apply(0, Array(11)),
        awayBatsmenRuns: Array.apply(0, Array(11)),
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

/*
    MATCH: main methods
*/

function parseRuns(inputRuns) {
    initialStr = " ";
    switch (inputRuns) {
        case 0:
            scoring.dotBall(initialStr);
            break;
        case 1:
            scoring.takeSingle(initialStr);
            break;
        case 2:
            scoring.takeDouble(initialStr);
            break;
        case 3:
            scoring.takeTriple(initialStr);
            break;
        case 4:
            scoring.Boundary(initialStr);
            break;
        case 5:
            scoring.takeFive(initialStr);
            break;
        case 6:
            scoring.Sixer(initialStr);
            break;

        default:
        // code block
    }
}



// update runs
router.patch("/match/:id/updateRuns", requireLogin, (req, res) => {
    const { runsToAdd, teamToUpdate, batsmanToUpdate } = req.body;




    teamToUpdate = teamToUpdate.toLowerCase();
    if (teamToUpdate === "home") {

        /*

        Here you need to write code that searches for batsmanToUpdate in homeBatsmen and then finds the index in the array
        For that index number, look in homeBatsmenRuns and increment the corresponding position by runsToAdd
        
        */


        parseRuns(runsToAdd);
        Match.findOneAndUpdate(
            { _id: req.params.id },
            { homeRuns: { $inc: runsToAdd } },
            //here add the update to homeBatsmenRuns, which will update the database

        )
            .then((response) => res.status(200).json(response))
            .catch((err) => {
                return res.status(400).json({
                    error: "Error updating runs for home team",
                });
            });
    } else if (teamToUpdate === "away") {
        parseRuns(runsToAdd);
        Match.findOneAndUpdate(
            { _id: req.params.id },
            { awayRuns: { $inc: runsToAdd } }
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
    const { wicketsToAdd, teamToUpdate } = req.body;
    teamToUpdate = teamToUpdate.toLowerCase();
    if (teamToUpdate === "home") {
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
