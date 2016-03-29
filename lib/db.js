var mongoose = require('mongoose');
var config = require('../configUntracked');
var Contact = require('../models/contact');

module.exports = {
    connect: function(){
        mongoose.connect(config.mongoUrl);
        var db = mongoose.connection;
        db.on('error', console.error.bind(console, 'connection error:'));
        db.on('open', function(){
            console.log('Mongoose connected.');
        });
    },
    dataToDb: function(data /* array */){
        data.map(deleteIdProp)
            .forEach(function(contactObj){
                var contact = new Contact(contactObj);
                contact.save(function (err) {
                    if(err){return console.log(err);}
                    console.log(contactObj.nameFull + ' successfully saved!');
                });
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

// HOISTED FUNCTIONS
// Delete _id property
function deleteIdProp(obj){
    // This function is sloppy in that it isn't functional. Ideally, I should clone the object and leave out the _id
    // property as part of the cloning process (or delete it from the clone). But since this is a quick-and-dirty way
    // to get data into the db, I'm ok leaving it this way for now.
    delete obj._id;
    return obj;
}

// Add one contact obj to Database
