/**
 * Created by Nicholas Barry on 2/17/2016.
 */
var express = require('express');
var router = express.Router();
//var home = require('../controllers/home');// todo: haven't created yet
//var contact = require('../controllers/contact');// todo: haven't created yet

router.get('/', function(req,res){
    res.send('Hello world!')
});
router.get('/contact/:contact_id', function(req,res){
    res.send('Hello world!')
});

module.exports = router;