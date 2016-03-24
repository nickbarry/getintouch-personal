var Contact = require('../models/contact');
var dummyData = require('../dummyData.json');

module.exports = {
    index: function(req,res,next){
        res.render('index', dummyData);

        //Contact.getByPriority(function(err, contacts){
        //    if(err) {return next(err);}
        //
        //    res.render('contacts/index', {
        //        contacts: contacts,
        //        info: req.flash('info')[0],
        //        error: req.flash('error')[0]
        //    });
        //});
    },
    //elyse: function(req,res,next){
    //    var elyse = new Contact({
    //        firstName: "Elyse",
    //        lastName: "Green",
    //        phone1: "1234567890",
    //        email: "test@elyse.com",
    //        address: "Candyland, USA",
    //    });
    //
    //    elyse.save(function(err, elyse){
    //        if(err) return console.error(err);
    //        res.json({"full name": elyse.fullName()});
    //    });
    //},
    //show: function(req,res,next){
    //    var contact = new Contact(req.params.contact);
    //
    //    contact.exists(function (exists) {
    //        if(!exists) {return res.send(404, 'Page Not found');}
    //
    //        res.send(contact); // TODO: I'm not sure this is right, or
    //        // even will work. I transcribed this from the textbook's
    //        // function focused on files, not contacts.
    //    });
    //},
    //destroy: function(req,res,next){
    //    var contact = new Contact(req.params.contact);
    //
    //    contact.delete(function (err) {
    //        if(err){return next(err);}
    //
    //        req.flash('info', 'Contact successfully deleted!');
    //        res.redirect('/');
    //    });
    //},
    showCreateNewForm: function(req,res){
        res.render('contacts/new', null);
    },
    create: function(req,res){
        console.log('req.body: ',req.body);
        var processedBody = processNewContact(req.body);
        console.log('processedBody: ',processedBody);
        console.log('req.body: ',req.body);

        res.redirect('/contacts/new');

        // TODO with inputs:
        // - Check if contact exists already (via phone and email; any other unique identifiers?)
        // - Convert submitted name into first/last format (and potentially middle?; create function for this)
        // - Check for undefined values
        // - Tags: Replace any ", " with "," before separating into an array
        // - Ultimately, I need to do some sort of encoding(??) to make sure no one submits malicious code
        // - I should do some front-end validation, too, for the benefit of the user

        //var contact = new Contact(req.params.contact);
        //
        //contact.save(function (err) {
        //    if(err){return next(err);}
        //
        //    req.flash('info', 'Contact successfully created!');
        //    res.redirect('/contact/' + contact.id); // TODO: need to create that property
        //});
    }
};

function processNewContact(body){
    var bodyKeys = Object.keys(body),
        trimmedBody = bodyKeys.reduce(deleteEmptyStringProps,body);
    //if(processedBody.nameFull){
    //
    //}
    return trimmedBody;

    //function propertyChecker(property, value){
    //
    //}
}

// TODO: I'll probably want to put the functions below in a utilities function module
function deleteEmptyStringProps(obj,key){
    if(obj[key] === ''){ // user didn't submit anything for this property
        delete obj[key];
    }
    return obj; // this function looks functional, but actually permanently deletes props from the original body
    // object. At this point I don't care, and I get the benefit of a very concise function, but there are probably
    // better ways to do it. Maybe I should create a clone of the body object before passing it to the deleteEmptyStringProps
    // fn?
}

