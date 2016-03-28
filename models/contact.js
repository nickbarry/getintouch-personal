var mongoose = require('mongoose');

function validateField(string){
    return /^[a-z0-9_'-]+$/i.test(username);
    //TODO: This doesn't currently allow spaces; probably has other problems too
    //TODO: I should validate on frontend and backend, right?
}

var contactSchema = mongoose.Schema({
    // I can generate dummy data from this template I put together:
    // http://beta.json-generator.com/4kzsToHpl
    nameFull: String, // This is what user enters when creating a contact; use this to guess First and Last (and
    // sometimes Middle) names
    nameFirst: String, // TODO: Validation/processing: should capitalize first name
    nameMiddle: String, // rare
    nameLast: String,
    phone1: String, // TODO: Validation/processing: Make sure it's 10+ digits
    phoneOthers: [String], // TODO: Validation/processing: Make sure each is 10+ digits
    email: String, // TODO: Validation/processing: proper email format
    near: String,
    notes: String,
    lastContacted: Date, // This could be in the future, if the user wants to be able to record in advance an expected
                         // upcoming contact
                         // TODO: Validation/processing: Must be date, or date string, or something that can be converted to date.
                         // Or maybe just be more strict. I'm expecting a date string in a certain format from the
                         // input[type="date"] element, and if I don't get something in that format, display an error.
                         // Or do some browsers not support that input type?
    contactFrequency: {type: Number, default: 180}, // # days after which I should contact again
        // TODO: Validation/processing: Must be number >= 0. 0 means that I won't necessarily follow up with them. Or
        // maybe I should have a separate checkbox option below this field where the user can indicate no follow-up.
    contactNext: Date, // TODO: Should I replace this with a virtual property? Is there a
    // noticeable difference in the speed of searching for a lot of contacts according to
    // a real property, vs. a virtual property? I'll be searching for this property frequently
    // TODO: Validation/processing: date or number or string - something that can be converted to a date. Or maybe just be more strict.
    // I'm expecting a date string in a certain format from the input[type="date"] element, and if I don't get something in that format,
    // display an error. Or do some browsers not support that input type?
    tags: [String],
    priority: {type: Number, default: 3}, // TODO: Validation/processing: number 0-5, inclusive
    isActive: {type: Boolean, default: true} // TODO: Validation/processing: boolean
});

contactSchema.methods.fullName = function(){
    return this.firstName + ' ' + this.lastName;
};

var Contact = mongoose.model('Contact', contactSchema);

module.exports = Contact;