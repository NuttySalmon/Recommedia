var express = require('express');
var router = express.Router();
var Page = require('../models/page');


//Get Create page
router.get('/create', ensureAuthenticated, function(req, res) {

    res.render('createPage');

    //console.log(req.user);
});

router.post('/create', function(req, res) {
    var title = req.body.title;
    var type = req.body.type;
    var details = req.body.details;

    var newPage = new Page({
        title: title,
        type: type,
        details: details
    });

    Page.createPage(newPage, function(err, page) {
        console.log(page);
    });
    res.redirect('/');
});

router.get('/list', ensureAuthenticated, function(req, res) {

    res.render('listPages');

});

//redirect to login page if not authenticated
function ensureAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    } else {
        res.redirect('/users/login');
    }
}



module.exports = router;