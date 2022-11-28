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
    const { name, teams } = req.body;
    if (!name) {
        return res.status(422).json({
            error: "Missing required parameter",
        });
    }

    // if (!name || !captain) {
    //     return res.status(422).json({
    //         error: "Missing required parameter",
    //     });
    // }

    const newTournament = new Tournament({
        name: name,
        teams: teams ? teams : Array(16),
    });
    
    for (oneTeam in teams){
        Team.findOne({ name: oneTeam }).then((foundTeam) => {
            if(!foundTeam){
                return res.status(400)({
                    error: "No team found with name " + foundTeam,
                });
            }
        });
    }

    newTournament
        .save()
        .then((tournament) => res.json(tournament))
        .catch((err) => console.log(err));

    


    // User.findOne({ name: captain }).then((player) => {
    //     if (player) {
    //         Team.findOne({ name: name })
    //             .then((savedTeam) => {
    //                 if (savedTeam) {
    //                     return res.status(422).json({
    //                         error: "Team with this name already exists",
    //                     });
    //                 }

    //                 const newTeam = new Team({
    //                     name: name,
    //                     captain: captain,
    //                     roster: roster ? roster : Array(11),
    //                 });

    //                 newTeam
    //                     .save()
    //                     .then((team) => res.json(team))
    //                     .catch((err) => console.log(err));
    //             })
    //             .catch((err) => console.log(err));
    //     } else {
    //         return res.status(400).json({
    //             error: "No player found with that name. Please register before trying again.",
    //         })
    //     }
    // })
    // .catch((err) => console.log(err));
});













