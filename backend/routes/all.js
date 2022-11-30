const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

const User = mongoose.model("User");
const Team = mongoose.model("Team");
const Match = mongoose.model("Match");
const Tournament = mongoose.model("Tournament");

router.get("/everything", (req, res) => {
    let users = [];
    let teams = [];
    let matches = [];
    let tournaments = [];

    User.find({}, (err, foundUsers) => {
        foundUsers.forEach((user) => {
            users.push({
                id: user.id,
                name: user.name,
                email: user.email,
                hand: user.hand ? user.hand : "",
                position: user.position ? user.position : "",
            });
        });
    }).catch((err) => console.log(err));

    Team.find({}, (err, foundTeams) => {
        foundTeams.forEach((team) => {
            teams.push({
                name: team.name,
                captain: team.captain,
                roster: team.roster,
            });
        });
    }).catch((err) => console.log(err));

    Match.find({}, (err, foundMatches) => {
        foundMatches.forEach((match) => {
            matches.push({
                home: match.home,
                away: match.away,
                homeRuns: match.homeRuns,
                homePlayers: match.homePlayers,
                homeBatsmenRuns: match.homeBatsmenRuns,
                homeBowlerWickets: match.homeBowlerWickets,
                homeWicketsLost: match.homeWicketsLost,
                awayRuns: match.awayRuns,
                awayPlayers: match.awayPlayers,
                awayBatsmenRuns: match.awayBatsmenRuns,
                awayBowlerWickets: match.awayBowlerWickets,
                awayWicketsLost: match.awayWicketsLost,
                homeBowling: match.homeBowling,
                awayBowling: match.awayBowling,
                isMatchOver: match.isMatchOver,
                winner: match.winner,
                numOvers: match.numOvers,
            });
        });
    }).catch((err) => console.log(err));

    Tournament.find({}, (err, foundTourns) => {
        foundTourns.forEach((tournament) => {
            tournaments.push({
                name: tournament.name,
                teams: tournament.teams,
            });
        });
    }).catch((err) => console.log(err));

    res.status(200).json({
        users: users,
        teams: teams,
        matches: matches,
        tournaments: tournaments,
    });
});

module.exports = router;
