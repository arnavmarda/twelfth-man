const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { SECRET_KEY } = require("../keys.js");
const { randBetween } = require("../utility.js");

const User = mongoose.model("User");

/*
    REGISTRATION functionality
*/
router.post("/registration", (req, res) => {
    const { name, email, password, hand, position } = req.body;
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
                    res.json({ token: token });
                    const payload = {
                        id: savedUser._id,
                        name: savedUser.name,
                    };

                    jwt.sign(payload, SECRET_KEY, (err, token) => {
                        res.json({
                            success: true,
                            token: "Bearer " + token,
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

module.exports = router;

function isNameTaken(userGiven)
{ 
    Name.count({ userGiven }).then((count) => 
    { 
        if (count != 0)
        { 
          return true; 
        } 
        return false; 
    }); 
} 

function isPasswordTaken(passGiven)
{ 
    Password.count({ passGiven }).then((count) => 
    { 
        if (count != 0)
        { 
          return true; 
        } 
        return false; 
    }); 
} 

function isEmailTaken(passGiven)
{ 
    Email.count({ passGiven }).then((count) => 
    { 
        if (count != 0)
        { 
          return true; 
        } 
        return false; 
    }); 
} 