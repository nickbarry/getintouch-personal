var Contact = require('../models/contact');

module.exports = {
    index: function(req,res,next){
        res.json({"message": "Hello, World!"});

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
    elyse: function(req,res,next){
        var elyse = new Contact({
            firstName: "Elyse",
            lastName: "Green",
            phone1: "1234567890",
            email: "test@elyse.com",
            address: "Candyland, USA",
        });

        elyse.save(function(err, elyse){
            if(err) return console.error(err);
            res.json({"full name": elyse.fullName()});
        });
    },
    show: function(req,res,next){
        var contact = new Contact(req.params.contact);

        contact.exists(function (exists) {
            if(!exists) {return res.send(404, 'Page Not found');}

            res.send(contact); // TODO: I'm not sure this is right, or
            // even will work. I transcribed this from the textbook's
            // function focused on files, not contacts.
        });
    },
    destroy: function(req,res,next){
        var contact = new Contact(req.params.contact);

        contact.delete(function (err) {
            if(err){return next(err);}

            req.flash('info', 'Contact successfully deleted!');
            res.redirect('/');
        });
    },
    create: function(req,res,next){
        var contact = new Contact(req.params.contact);

        contact.save(function (err) {
            if(err){return next(err);}

            req.flash('info', 'Contact successfully created!');
            res.redirect('/contact/' + contact.id); // TODO: need to create that property
        });
    }
};