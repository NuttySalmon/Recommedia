var express = require('express');
var router = express.Router();

var User = require('../models/user');
var passport = require('passport');

var LocalStrategy = require('passport-local').Strategy;

// register
router.get('/register', function(req, res) {
    res.render('register');
});


// login
router.get('/login', function(req, res) {
    res.render('login');
});

// register user
router.post('/register', function(req, res) {
    var name = req.body.name;
    var username = req.body.username;
    var password = req.body.password;
    var password2 = req.body.password2;

    //validate password2
    req.checkBody('password2', 'Passwords do not match').equals(req.body.password);
    var errors = req.validationErrors();

    //catch errors
    if (errors) {
        res.render('register', {
            errors: errors
        });

    } else { // new User object
        var newUser = new User({
            name: name,
            username: username,
            password: password
        });


        //create new user in db
        User.createUser(newUser, function(err, user) {
            //check for error
            if (err && err.code !== 11000) {
                console.log(err);
                console.log(err.code);
                throw err;
            }

            //check for username duplication
            else if (err && err.code === 11000) {
                req.flash('error', 'User already exists');
                console.log(err);
                res.redirect('/users/register');
            } else {
                console.log(user);
                req.flash('success_msg', 'You are registered and can now login.');
                res.redirect('/users/login');
            }
        });




    }

});

//passport for authentication
passport.use(new LocalStrategy(
    function(username, password, done) {

        User.getUserByUsername(username, function(err, user) {
            if (err) throw err;
            if (!user) {
                return done(null, false, { message: 'Unknown user' });
            }

            User.comparePassword(password, user.password, function(err, isMatch) {
                if (err) throw err;
                if (isMatch) {
                    done(null, user);
                } else {
                    return done(null, false, { message: 'Invalid password' });
                }
            });
        });

    }));


//serialization
passport.serializeUser(function(user, done) {
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    User.getUserById(id, function(err, user) {
        done(err, user);
    });
});


router.post('/login',
    passport.authenticate('local', { successRedirect: '/', failureRedirect: '/users/login', failureFlash: true }),
    function(req, res) {
        res.redirect('/', user);
    });

router.get('/logout', function(req, res) {
    req.logout();
    req.flash('success_msg', 'Log out successfully.');
    res.redirect('/users/login');
});


module.exports = router;