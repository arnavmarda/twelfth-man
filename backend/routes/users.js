const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../keys.js");
const { randBetween } = require("../utilities/misc.js");

const User = mongoose.model("User");
const Team = mongoose.model("Team");
const Tournament = mongoose.model("Tournament");

/*
    REGISTRATION functionality
*/
router.post("/register", (req, res) => {
    // const { name, email, password, hand, position } = req.body;
    const name = req.body.name;
    const email = req.body.email;
    const password = req.body.password;
    const hand = req.body.hand;
    const position = req.body.position;
    if (!name || !email || !password) {
        return res.status(422).json({
            error: "Missing required parameter",
        });
    }

    User.findOne({ email: email })
        .then((savedUser) => {
            if (savedUser) {
                return res.status(422).json({
                    error: "User with this email already exists",
                });
            }

            bcrypt.hash(password, 5).then((hashedPassword) => {
                const user = new User({
                    id: randBetween(100000, 200000),
                    name: name,
                    email: email,
                    password: hashedPassword,
                    hand: hand ? hand : "",
                    position: position ? position : "",
                });

                user.save()
                    .then((user) => res.json(user))
                    .catch((err) => console.log(err));
            });
        })
        .catch((err) => console.log(err));
});

/*
    LOGIN functionality
*/
router.post("/login", (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(422).json({
            error: "Please enter both an email and a password",
        });
    }

    User.findOne({ email: email }).then((savedUser) => {
        if (!savedUser) {
            return res.status(422).json({
                error: "Invalid email or password",
            });
        }
        bcrypt
            .compare(password, savedUser.password)
            .then((doMatch) => {
                if (doMatch) {
                    const token = jwt.sign({ _id: savedUser._id }, SECRET_KEY);
                    // res.json({ token: token });
                    const payload = {
                        id: savedUser._id,
                        name: savedUser.name,
                    };

                    jwt.sign(payload, SECRET_KEY, (err, token) => {
                        res.json({
                            token: token,
                            name: savedUser.name,
                            registrationID: savedUser.id,
                            hand: savedUser.hand,
                            position: savedUser.position,
                        });
                    });
                } else {
                    return res.status(422).json({
                        error: "Invalid email or password",
                    });
                }
            })
            .catch((err) => {
                console.log(err);
            });
    });
});

/*
    Get list of all users
*/
router.get("/userList", (req, res) => {
    User.find({}, (err, users) => {
        let usersList = [];

        users.forEach((user) => {
            usersList.push({
                id: user.id,
                name: user.name,
                email: user.email,
                hand: user.hand ? user.hand : "",
                position: user.position ? user.position : "",
            });
        });

        res.status(200).json(usersList);
    }).clone().catch((err) => console.log(err));
});

/*
    Get a list of a user's teams
*/

router.get("/userTeamList", requireLogin, (req, res) => {
    const { name } = req.body;
    User.findOne({ name: name }).then((foundUser) => {
        if (!foundUser) {
            return res.status(422).json({
                error: "No user with this name",
            });
        }

        let teamList = []

        Team.find({}, (err, teams) => {
            teams.forEach((team) => {
                if (team.roster.includes(name)) {
                    teamList.push({
                        name: team.name,
                        id: team._id,
                    });
                }
            });
            res.status(200).json(teamList);
        }).clone().catch((err) => console.log(err));


    });
});


/*
    Get a list of a user's tournaments
*/


router.get("/userTournamentList", requireLogin, (req, res) => {
    const { name } = req.body;
    User.findOne({ name: name }).then((foundUser) => {
        if (!foundUser) {
            return res.status(422).json({
                error: "No user with this name",
            });
        }
        let teamList = [];
        let tournamentArray = [];
        Team.find({}, (err, teams) => {
            teams.forEach((team) => {
                if (team.roster.includes(name)){
                    teamList.push(team.name);
                }
            });
    
        }).clone().catch((err) => console.log(err));

        for(eachTeam in teamList){
            Tournament.find({}, (err, tournaments) => {
                tournaments.forEach((tournament) => {
                    if (tournament.teams.includes(eachTeam)) {
                        tournamentArray.push({
                            name: tournament.name,
                            id: tournament._id,
                        });
                    }
                });
                res.status(200).json(tournamentArray);
            }).clone().catch((err) => console.log(err));
        }

    });
});







/*
    Get user's profile
*/

router.post("/getUser", (req, res) => {
    const { id } = req.body;
    User.findOne({ id: id })
        .then((foundUser) => {
            if (!foundUser) {
                return res.status(422).json({
                    error: "No user with given ID",
                });
            }

            let teamArray = [];

            Team.find({}, (err, teams) => {
                teams.forEach((team) => {
                    if (team.roster.includes(foundUser.name)) {
                        teamArray.push(team.name);
                    }
                });
            }).catch((err) => console.log(err));

            const userInfo = {
                id: foundUser.id,
                name: foundUser.name,
                email: foundUser.email,
                hand: foundUser.hand,
                position: foundUser.position,
                teamList: teamArray,
            };

            res.json(userInfo);
        })
        .catch((err) => console.log(err));
});

module.exports = router;
