/**
 * Created by Nicholas Barry on 2/17/2016.
 */
var express = require('express'),
    router = express.Router(),
    home = require('../controllers/home'),// todo: haven't created yet
    contact = require('../controllers/contact');// todo: haven't created yet

router.get('/', home.index);// todo: haven't created yet
router.get('/contact/:contact_id', contact.index);// todo: haven't created yet

module.exports = router;