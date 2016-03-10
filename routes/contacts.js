var Contact = require('../models/contact');

module.exports = {
    index: function(req,res,next){
        res.send('Hello world!');

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