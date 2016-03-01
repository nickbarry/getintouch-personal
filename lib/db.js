var mongoose = require('mongoose');
var config = require('../configUntracked');

module.exports = {
    connect: function(){
        mongoose.connect(config.mongoUrl);
        var db = mongoose.connection;
        db.on('error', console.error.bind(console, 'connection error:'));
        db.on('open', function(){
            console.log('Mongoose connected.');
        });
    },
    isValidationError: function(err){
        return ((err.name === 'ValidationError')
                  || (err.message.indexOf('ValidationError') !== -1));
    },
    isDuplicateKeyError: function(err){
        return (err.message.indexOf('duplicate key') !== -1);
    }
};