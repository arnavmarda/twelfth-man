const JWTStrategy = require("passport-jwt").Strategy;
const ExtractJWT = require("passport-jwt").ExtractJwt;
const mongoose = require("mongoose");
const User = mongoose.model("User");
const { SECRET_KEY } = require("../keys.js");

const opts = {};

opts.jwtFromRequest = JWT.fromAuthHeaderAsBearerToken();
opts.secretOrKey = SECRET_KEY;

module.exports = (passport) => {
    passport.use(
        new JWTStrategy(opts, (payload, done) => {
            User.findById(payload.id)
                .then((user) => {
                    if (user) {
                        return done(null, user);
                    } else {
                        return done(null, false);
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        })
    );
};
