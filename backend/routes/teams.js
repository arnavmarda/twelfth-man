const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const requireLogin = require("../middleware/requireLogin.js");
const team = require("../models/team.js");
const { route } = require("./tournaments.js");

const User = mongoose.model("User");
const Team = mongoose.model("Team");
const Tournament = mongoose.model("Tournament");
const Match = mongoose.model("Match");

/*
    Fetch a team
*/
router.get("/team/:id", (req, res) => {
    Team.findOne({ _id: req.params.id })
        .then((team) => res.status(200).json(team))
        .catch((err) => {
            return res.status(400).json({
                error: "Couldn't find team with given ID",
            });
        });
});

/* 
    Get all teams
*/
router.get("/teamList", (req, res) => {
    Team.find({}, (err, teams) => {
        let teamsList = [];

        teams.forEach((team) => {
            teamsList.push({
                name: team.name,
                captain: team.captain,
                roster: team.roster,
        });
        });

        res.status(200).json(teamsList);
    }).catch((err) => console.log(err));
});

/*
    Create a team
*/
router.post("/team/create", (req, res) => {
    const { name, captain, roster } = req.body;
    console.log("Req body: ", req.body);
    if (!name || !captain) {
        return res.status(422).json({
            error: "Missing required parameter",
        });
    }

    User.findOne({ name: captain })
        .then((player) => {
            if (player) {
                Team.findOne({ name: name })
                    .then((savedTeam) => {
                        if (savedTeam) {
                            return res.status(422).json({
                                error: "Team with this name already exists",
                            });
                        }

                        const teamID = name;
                        teamID = teamID.toLowerCase();
                        teamID = teamID.replaceAll(' ', '');

                        const newTeam = new Team({
                            name: name,
                            captain: captain,
                            roster: roster,
                            teamID: teamID
                        });

                        newTeam
                            .save()
                            .then((team) => res.json(team))
                            .catch((err) => console.log(err));
                    })
                    .catch((err) => console.log(err));
            } else {
                return res.status(400).json({
                    error: "No player found with that name. Please register before trying again.",
                });
            }
        })
        .catch((err) => console.log(err));
});

/*
    Delete a team
*/
router.delete("/team/delete/:id", (req, res) => {
    Team.findOneAndDelete({ _id: req.params.id })
        .then((response) => res.status(200).json(response))
        .catch((err) => {
            return res.status(400).json({
                error: "Error deleting team",
            });
        });
});




/*
    Get a list of a team's upcoming games
*/

router.get("/getInfoForTeam", (req, res) => {
    const { id } = req.body;
    let arrayOfAllInfo = []
    let rosterArray = [];
    let arrayOfGames = [];
    let tournamentArray = [];
    Team.findOne({ _id: id }).then((foundTeam) => {
        if (!foundTeam) {
            return res.status(422).json({
                error: "No team with this name",
            });
        }
        //create an array for the roster
        rosterArray = foundTeam.roster;


        //set captain
        const captainOfTeam = foundTeam.captain;

        //create an array of upcoming matches of the team
        Match.find({}, (err, matches) => {
            macthes.forEach((match) => {
                if (match.home === foundTeam.name || match.away === foundTeam.name) {
                    if(!match.isMatchOver){
                        arrayOfGames.push({
                            id: match._id,
                            home: match.home,
                            away: match.away,
                        });
                    }

                }
            });
        }).catch((err) => console.log(err));


        //create an array of all tournaments of the team
        Tournament.find({}, (err, tournaments) => {
            tournaments.forEach((tournament) => {
                if (tournament.teams.includes(foundTeam.name)) {
                    tournamentArray.push({
                        name: tournament.name,
                        id: tournament._id,
                    });
                }
            });

        }).catch((err) => console.log(err));

        let teamList = [];

        Team.find({}, (err, teams) => {
            teams.forEach((team) => {
                teamList.push(team.name);
            });
        }).catch((err) => console.log(err));
        
        const teamToSuggest = " ";

        do {
            const randIndex = Math.floor(Math.random() * teamList.length);
            teamToSuggest = teamList[randIndex];
          } while (teamToSuggest === foundTeam.name);


        arrayOfAllInfo.push({
            captain: captainOfTeam,
            name: foundTeam.name,
            roster: rosterArray,
            upcomingMatches: arrayOfGames,
            tournaments: tournamentArray,
            suggestedOpponent: teamToSuggest,
        })
        res.status(200).json(arrayOfAllInfo);

    }).catch((err) => console.log(err));
});

module.exports = router;







