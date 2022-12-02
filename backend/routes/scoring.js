const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

const Match = mongoose.model("Match");

router.post("/ballUpdate", (req, res) => {
    let {
        matchID,
        batsman,
        bowler,
        runsMade,
        wicketsTaken,
        inningsNo,
        currentOver,
        ballSymbol,
        isExtra,
    } = req.body;

    const overToUpdateIDX = currentOver;

    Match.findOne({ _id: new mongoose.Types.ObjectId(matchID) })
        .then((match) => {
            let battingIDX;
            let bowlingIDX;
            if (inningsNo === 1) {
                battingIDX = match.homePlayers.indexOf(batsman.name);
                bowlingIDX = match.awayPlayers.indexOf(bowler.name);
            } else {
                bowlingIDX = match.homePlayers.indexOf(bowler.name);
                battingIDX = match.awayPlayers.indexOf(batsman.name);
            }

            if (battingIDX === -1) {
                return res.status(400).json({
                    error: "Couldn't find " + batsman + " in batting team",
                });
            } else if (bowlingIDX === -1) {
                return res.status(400).json({
                    error: "Couldn't find " + bowler + " in bowling team",
                });
            }

            if (inningsNo === 1) {
                Match.findOne({ _id: new mongoose.Types.ObjectId(matchID) })
                    .then((match) => {
                        homeBatsmenRuns = match.homeBatsmenRuns;
                        homeBatsmenBallsFaced = match.homeBatsmenBallsFaced;
                        awayBowlerWickets = match.awayBowlerWickets;
                        awayBowlerBallsBowled = match.awayBowlerBallsBowled;
                        awayBowlerRunsGiven = match.awayBowlerRunsGiven;
                        awayBowlerExtras = match.awayBowlerExtras;

                        homeBatsmenRuns[battingIDX] += runsMade;
                        homeBatsmenBallsFaced[battingIDX] += 1;
                        awayBowlerWickets[bowlingIDX] += wicketsTaken;
                        awayBowlerBallsBowled[bowlingIDX] += 1;
                        awayBowlerRunsGiven[bowlingIDX] += runsMade;
                        awayBowlerExtras[bowlingIDX] += isExtra ? 1 : 0;

                        awayBowling = match.awayBowling;
                        awayBowling[overToUpdateIDX] =
                            awayBowling[overToUpdateIDX] + " " + ballSymbol;

                        match.save();
                    })
                    .catch((err) => console.log(err));
            } else {
                Match.findOne({ _id: new mongoose.Types.ObjectId(matchID) })
                    .then((match) => {
                        awayBatsmenRuns = match.awayBatsmenRuns;
                        awayBatsmenBallsFaced = match.awayBatsmenBallsFaced;
                        homeBowlerWickets = match.homeBowlerWickets;
                        homeBowlerBallsBowled = match.homeBowlerBallsBowled;
                        homeBowlerRunsGiven = match.homeBowlerRunsGiven;
                        homeBowlerExtras = match.homeBowlerExtras;

                        awayBatsmenRuns[battingIDX] += runsMade;
                        awayBatsmenBallsFaced[battingIDX] += 1;
                        homeBowlerWickets[bowlingIDX] += wicketsTaken;
                        homeBowlerBallsBowled[bowlingIDX] += 1;
                        homeBowlerRunsGiven[bowlingIDX] += runsMade;
                        homeBowlerExtras[bowlingIDX] += isExtra ? 1 : 0;

                        homeBowling = match.homeBowling;
                        homeBowling[overToUpdateIDX] =
                            homeBowling[overToUpdateIDX] + " " + ballSymbol;

                        match.save();
                    })
                    .catch((err) => console.log(err));
            }
        })
        .catch((err) => {
            return res.status(400).json({
                error: "Couldn't find ID",
            });
        });
});

module.exports = router;
