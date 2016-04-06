var Contact = require('../models/contact');
var dummyData = require('../dummyData.json');

module.exports = {
    index: function(req,res,next){
        console.log('loading homepage');
        Contact.find({},function(err,results){
            if(err){throw err;} // TODO: Handle this better
            res.render('index', results);
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
            if(err) {throw err;} // TODO: Handle this better
            if(result) { // If we found a matching contact
                res.render('contact/contact', result); // Render contact page and send processed contact data
            }else{ // Contact not found
                res.status(404).send('Page Not found'); // TODO: Should render actual 404 template
            }
        });
    },
    destroy: function(req,res,next){
        //res.json({test: 'affirmative'});
        //res.redirect(204,'http://localhost:3000');
        Contact.findByIdAndRemove(req.params.id, function(err,doc){
            if(err){return next(err);}
            //console.log(doc);
            //console.log(res.redirect.toString());
            // req.flash('info', 'Contact successfully deleted!'); TODO: Figure out how Flash works and start using it

            res.writeHead(204, {
                Location: 'http://localhost:3000'
            });
            return res.end();

            // THE BLOCKS BELOW, SEPARATED BY EMPTY LINES, ARE ALL ALTERNATIVES I'VE TRIED - ALL BUT ONE OF THE BLOCKS SHOULD BE COMMENTED OUT
            // ALTERNATIVE 1: Use res.redirect to redirect to homepage. Isn't working.
            //res.redirect(204,'http://localhost:3000'); // Not working. Have tried various path varients: '/', '..', '../..', '[another legitimate contact ID]', '/contacts/new', '../contacts/new', 'back'

            // ALTERNATIVE 2: Try calling the index method to load the homepage
            // I wrote the line below in an attempt to call the method that loads the homepage. It didn't seem to do anything. The index method never gets called.
            //module.exports.index(req,res,next);

            // ALTERNATIVE 3: Try manually doing what the index function does - find contacts and render the homepage. The console.log works, but no page is rendered.
            //Contact.find({},function(err,results){
            //    if(err){throw err;} // TODO: Handle this better
            //    console.log('I found a ' + results.length + ' results after deleting the contact');
            //    res.render('index', results);
            //}); // Find all docs, no projection
        });
    },
    showCreateNewForm: function(req,res){
        res.render('contacts/new', null);
    },
    create: function(req,res,next){
        var contact = new Contact(processNewContact(req.body));

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
// This takes the data a user sends us when creating a new contact, and processes it so it's ready to be sent to MongoDB.
// The virtual properties on the Contact schema do more processing.
function processNewContact(body){ // TODO: Make this function in functional style
    var bodyKeys = Object.keys(body);
    bodyKeys.forEach(function(key){ // Delete empty string properties
        if(body[key] === '') delete body[key];
    })
    if(body.contactFrequency && body.lastContacted){ // contactFreq indicates that user wants to follow up with contact; use lastContacted to decide when to contact next
        body.contactNext = new Date(body.lastContacted + ' 0:00:00 -0700'); // Create date, accounting for timezone. TODO: Make this variable based on user's timezone
        body.lastContacted = new Date(body.lastContacted + ' 0:00:00 -0700'); // convert lastContacted to Date object
        body.contactNext.setHours(body.contactFrequency * 24); // Update contactNext per contactFrequency
    }else if(body.contactFrequency){ // contactFreq indicates that user wants to follow up with contact...
        body.contactNext = new Date(); // ...contact them today, if I don't know when I contacted them last!
        body.contactNext.setHours(0,0,0,0); // set time to midnight
    }
    return body;
}