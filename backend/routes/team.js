const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const passport = require("passport-jwt");
const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../keys.js");
const { router } = require("./auth.js");
const team = require("../models/team.js");

const User = mongoose.model("User");
const Team = mongoose.model("Team");

/*
    Create a team
*/
router.post(
    "/createTeam",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
        const { name, captain, roster } = req.body;
        if (!name || !captain) {
            return res.status(422).json({
                error: "Missing required parameter",
            });
        }

        Team.findOne({ name: name })
            .then((savedTeam) => {
                if (savedTeam) {
                    return res.status(422).json({
                        error: "Team with this name already exists",
                    });
                }

                const newTeam = new Team({
                    name: name,
                    captain: captain,
                    roster: roster ? roster : Array(11),
                });

                team.save()
                    .then((team) => res.json(team))
                    .catch((err) => console.log(err));
            })
            .catch((err) => console.log(err));
    }
);

router.patch(
    "/updateTeam/:id",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
        const { name, captain, roster } = req.body;
        Team.findOneAndUpdate(
            { _id: req.params.id },
            { $set: { name, captain, roster } }
        )
            .then((response) => res.status(200).json(response))
            .catch((err) => {
                return res.status(400).json({
                    error: "Error updating team",
                });
            });
    }
);

router.delete(
    "/deleteTeam/:id",
    passport.authenticate("jwt", { session: false }),
    (req, res) => {
        Team.findOneAndDelete({ _id: req.params.id })
            .then((response) => res.status(200).json(response))
            .catch((err) => {
                return res.status(400).json({
                    error: "Error deleting team",
                });
            });
    }
);
