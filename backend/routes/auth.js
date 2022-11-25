const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const requireLogin = require("../middleware/requireLogin.js");
const { SECRET_KEY } = require("../keys.js");

const User = mongoose.model("User");

router.get("/protected", requireLogin, (req, res) => {
    res.send("Hello, user!");
});

router.post("/signup", (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return res.status(422).json({
            error: "Missing parameter",
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
                    name: name,
                    email: email,
                    password: hashedPassword,
                });

                user.save()
                    .then((user) => {
                        res.json({ message: "User saved successfully" });
                        console.log(User.schema.tree.name);
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            });
        })
        .catch((err) => {
            console.log(err);
        });
});

router.post("/signin", (req, res) => {
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
                    res.json({ token: token });
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

module.exports = router;
