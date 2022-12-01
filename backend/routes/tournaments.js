const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const requireLogin = require("../middleware/requireLogin.js");

const Team = mongoose.model("Team");
const Match = mongoose.model("Match");
const Tournament = mongoose.model("Tournament");

/*
    Fetch a tournament
*/

router.get("/tournament/:id", (req, res) => {
    Tournament.findOne({ _id: req.params.id })
        .then((tournament) => res.status(200).json(tournament))
        .catch((err) => {
            return res.status(400).json({
                error: "Couldn't find tournament with given ID",
            });
        });
});

/*
    Create a Tournament
*/
router.post("/tournament/create", requireLogin, (req, res) => {
    const { name, teams, numTeams } = req.body;
    if (!name || !teams) {
        return res.status(422).json({
            error: "Missing required parameter",
        });
    }

    Tournament.findOne({ name: name }).then((savedTeam) => {
        if (savedTeam) {
            return res.status(422).json({
                error: "Tournament with this name already exists",
            });
        }

        for (oneTeam in teams) {
            Team.findOne({ name: oneTeam }).then((foundTeam) => {
                if (!foundTeam) {
                    return res.status(400)({
                        error: "No team found with name " + foundTeam,
                    });
                }
            });
        }

        const newTournament = new Tournament({
            name: name,
            teams: teams,
            numTeams: numTeams,
        });

        newTournament
            .save()
            .then((tournament) => res.json(tournament))
            .catch((err) => console.log(err));
    });
});

/* 
    Get all tournaments
*/
router.get("/tournamentList", (req, res) => {
    Tournament.find({}, (err, tournaments) => {
        let tournamentsList = [];

        tournaments.forEach((tournament) => {
            tournamentsList.push({
                id: tournament._id,
                name: tournament.name,
                teams: tournament.teams,
                numTeams: tournament.numTeams,
            });
        });

        res.status(200).json(tournamentsList);
    }).clone().catch((err) => console.log(err));
});

/*
    Delete a tournament
*/
router.delete("/tournament/delete/:id", requireLogin, (req, res) => {
    Tournament.findOneAndDelete({ _id: req.params.id })
        .then((response) => res.status(200).json(response))
        .catch((err) => {
            return res.status(400).json({
                error: "Error deleting team",
            });
        });
});

module.exports = router;
