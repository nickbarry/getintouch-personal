var express = require('express');
var router = express.Router();
//var main = require('./main');
var contacts = require('./contacts');
//var sessions = require('./sessions');

//var home = require('../controllers/home');// todo: haven't created yet
//var contact = require('../controllers/contact');// todo: haven't created yet

router.get('/', /* main.requireUserAuth, */ contacts.index);
router.get('/contacts/new', contacts.showCreateNewForm);
router.get('/contact/:id', contacts.show);
router.get('/contact/:id/edit', contacts.show);
// TODO: Should I be removing requireUserAuth from these
// specific routes, and instead mounting the function as
// middleware? No part of my website should (yet) be public.
//router.route('/contact/:contact_id')
//    .get(/* main.requireUserAuth, */ contacts.show);
    //.del(/* main.requireUserAuth, */ contacts.destroy); // TODO: This line is problematic for some reason
router.post('/contacts', /* main.requireUserAuth, */ contacts.create);
//router.get('/sessions/new', sessions.new);
//router.route('/sessions')
//    .post(sessions.create)
//    .del(sessions.destroy);

// static middleware after the routes
router.use(express.static(__dirname + '/public'));

module.exports = router;