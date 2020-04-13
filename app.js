const express = require('express');
var passport = require('passport');
var BasicStrategy = require('passport-http').BasicStrategy;
var db = require('./db');

passport.use(new BasicStrategy(
    function (username, password, cb) {
        db.users.findByUsername(username, function (err, user) {
            if (err) {
                return cb(err);
            }
            if (!user) {
                console.debug("User not found");
                return cb(null, false);
            }
            if (user.password !== password) {
                console.debug("Password incorrect");
                return cb(null, false);
            }
            console.debug("All good");
            return cb(null, user);
        });
    }));

const app = express();
const port = 3000;

// app.get('/', (req, res) => res.send('Hello World!'))
app.get('/',
    passport.authenticate('basic', {session: false}),
    function (req, res) {
        res.json({username: req.user.username, email: req.user.emails[0].value});
    });

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))
