/**
 * Created by Nicholas Barry on 2/8/2016.
 */
var express = require('express'),
    app = express(),
    config = require('./server/configure'),
    mongoose = require('mongoose');

app = config(app);

mongoose.connect('mongodb://localhost/getintouch');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.on('open', function(){
    console.log('Mongoose connected.');
});

var server = app.listen(app.get('port'), function(){
    console.log('Server up: http://localhost:' + app.get('port'));
});