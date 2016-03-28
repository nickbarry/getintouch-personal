var Contact = require('../models/contact');
var dummyData = require('../dummyData.json');

module.exports = {
    index: function(req,res,next){
        Contact.find({},function(err,results){
            if(err){throw err;} // TODO: Handle this better
            res.render('index', results.concat(dummyData));
        }); // Find all docs, no projection


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
    show: function(req,res,next){
        Contact.findById(req.params.id,function(err,result){
            console.log(result);
            if(err) {throw err;} // TODO: Handle this better
            if(result.length) { // If we found a matching contact
                res.render('/contacts/contact', result); // Render contact page and send contact data
            }else{ // Contact not found
                res.status(404).send('Page Not found'); // TODO: Should render actual 404 template
            }
        });
    },
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
    create: function(req,res,next){
        console.log('req.body: ',req.body);
        var body = processNewContact(req.body); // TODO: see note within deleteEmptyStringProps fn about the false appearance
        // of proper functional Javascript. Should probably improve at some point.
        console.log('req.body: ',req.body);

        var contact = new Contact(req.body);

        contact.save(function (err) {
            if(err){return next(err);}

            //req.flash('info', 'Contact successfully created!'); // TODO: Figure out how Flash works and start using it
            //What happens after saving contact successfully: could redirect to that contact page; or could clear form
            //and display an alert with a link to that contact

            res.redirect('/contacts/new'); // TODO: Or should I clear the data and not need to do a page refresh?
        });
    }
};

// HOISTED FUNCTIONS
function processNewContact(body){
    var bodyKeys = Object.keys(body),
        body = bodyKeys.reduce(deleteEmptyStringProps,body);
    if(body.nameFull){ // if they entered a name (it would be very unusual if they didn't...)
        var names = namesFromFullName(body.nameFull);
        body.nameFirst = names.nameFirst;
        body.nameMiddle = names.namesMiddle;
        body.nameLast = names.nameLast;
    }
    if(body.phoneOthers) body.phoneOthers = commaDelimiter(body.phoneOthers);
    if(body.tags) body.tags = commaDelimiter(body.tags); // TODO: Once I start using something like Select2, this may
    // become unnecessary, since select2 may pass me an array, or something with strict delimitation
    if(body.near) body.near = body.near.replace(/: /g, ':');    // Replace ': ' with just a colon
    if(!body.contactFrequency) body.contactFrequency = 180;     // Set a default contactFrequency
    if(body.lastContacted){
        body.contactNext = new Date(body.lastContacted + ' 0:00:00 -0700'); // Create date, accounting for timezone. TODO: Make this variable based on user's timezone
        body.lastContacted = new Date(body.lastContacted + ' 0:00:00 -0700'); // convert lastContacted to Date object
        body.contactNext.setHours(body.contactFrequency * 24); // Update contactNext per contactFrequency
    }else{
        body.contactNext = new Date(); // contact them today, if I don't know when I contacted them last!
        body.contactNext.setHours(0,0,0,0); // set time to midnight
    }
    return body;
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

function namesFromFullName(nameFull){
    // TODO: Eventually, I should cover the case where someone enters a name in "Lastname, Firstname" format
    var names = {nameFirst: undefined, nameMiddle:undefined, nameLast: undefined},
        fullSplit = nameFull.split(' ');
    switch(fullSplit.length){
        case 0: // This shouldn't happen. If it does, leave all names undefined
            break;
        case 1: // User probably just entered a first name
            names.nameFirst = fullSplit[0];
            break;
        case 2: // User almost certainly entered a first name and last name (hopefully not in "Lastname, Firstname" format)
            names.nameFirst = fullSplit[0];
            names.nameLast = fullSplit[1];
            break;
        default: // In the case of 3 names, user possibly entered a first, middle and last name. Or possibly entered
            // someone with a two-word first or last name. In the case of 4+ names, who knows?
            // Based on my own personal use, I can think of more people I know with two-word first names than last names (with spaces).
            // And I don't plan on entering middle names. So I'll just treat cases like this as multiple-word first names,
            // and let the user sort out what's going on if the service ever inserts more names than necessary as a greeting.
            // TODO: If this is ever used for production, think more about whether/how I should derive middle names from full name.
            names.nameFirst = fullSplit.slice(0,fullSplit.length-1).join(" ");
            names.nameLast = fullSplit[fullSplit.length-1];
            break;
    }
    return names;
}

function commaDelimiter(str){
    // This takes a comma-delimited string, where there may or may not be spaces after some commas, and splits
    // it up into an array
    return str.replace(/, +/g, ',').split(',');
}