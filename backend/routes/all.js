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

    const findUsers = () => {
        User.find({}).then((err, foundUsers) => {
        foundUsers.forEach((user) => {
            users.push({
                id: user.id,
                name: user.name,
                email: user.email,
                hand: user.hand ? user.hand : "",
                position: user.position ? user.position : "",
            });
        });
    }).catch((err) => console.log("Users: ", err))};

    const findTeams = () => {
        Team.find({}).then((err, foundTeams) => {
        foundTeams.forEach((team) => {
            teams.push({
                name: team.name,
                id: team._id,
                teamID: team.teamID,
                captain: team.captain,
                roster: team.roster,
            });
        });
    }).catch((err) => console.log("Teams: ", err))};

    const findMatches = Match.find({}).then((err, foundMatches) => {
        foundMatches.forEach((match) => {
            matches.push({
                home: match.home,
                id: match._id,
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
    }).catch((err) => console.log("Matches: ", err));

    const findTournaments = Tournament.find({}).then((err, foundTourns) => {
        foundTourns.forEach((tournament) => {
            tournaments.push({
                id: tournament._id,
                name: tournament.name,
                teams: tournament.teams,
            });
        });
    }).catch((err) => console.log("Tournaments: ", err));

    findTeams.clone().exec();
    findUsers.clone().exec();
    findTournaments.clone().exec();
    findMatches.clone().exec();

    res.status(200).json({
        users: users,
        teams: teams,
        matches: matches,
        tournaments: tournaments,
    });
});

module.exports = router;
