const passport = require('passport');
const User = require('../models/user');
const dateAndTime = require('../getDateAndTime.js');
const LogFromFile = require('../models/logFromFile');

exports.getHomePage = (req, res) => {
    console.log(req.body);
    res.render('home');
}

exports.getRegisterPage = (req, res) => {
    res.render('register');
}

exports.postRegisterUser = (req, res) => {
    User.register({username: req.body.username}, req.body.password, (error, user) => {
        if(error) {
            console.log(error);
            res.redirect('/register');
        } else {
            passport.authenticate('local')(req, res, () => {
                res.redirect('/logs')
            });
        }
    });
}

exports.getLoginPage = (req, res) => {
    res.render('login');
}

exports.postLoginUser = (req, res) => {
    const user = new User({
        username: req.body.username,
        password: req.body.password
    });

    req.login(user, (error) => {
        if(error) {
            console.log(error);
            res.redirect('/login');
        } else {
            passport.authenticate('local')(req, res, () => {
                res.redirect('/logs');
            });
        }
    });
}

exports.getLogsPage = (req, res) => {
    if(req.isAuthenticated()){
        User.find({'secret': {$ne: null}}, (error, usersFound) => {
            if(error){
                console.log(error);
            } else {
                console.log(dateAndTime.getDateAndTimeLog(req.user.username));
                const newLog = new LogFromFile(dateAndTime.getDateAndTimeLog(req.user.username));
                newLog.saveLog(() => {
                    LogFromFile.fetchLogs(logLines => {
                        console.log(logLines);
                        res.render('logs', {logs: logLines});
                    });
                });
            }
        });
    } else {
        res.redirect('/login');
    }
}

exports.getLogoutUser = (req, res) => {
    req.logout();
    res.redirect('/login');
}