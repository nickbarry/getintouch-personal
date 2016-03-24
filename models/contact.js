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
    nameFirst: String,
    nameMiddle: String, // rare
    nameLast: String,
    phone1: String,
    phoneOthers: Array,
    email: String,
    near: String,
    notes: String,
    lastContacted: Date,
    contactFrequency: {type: Number, default: 180}, // # days after which I should contact again
    contactNext: Date, // TODO: Should I replace this with a virtual property? Is there a
    // noticeable difference in the speed of searching for a lot of contacts according to
    // a real property, vs. a virtual property? I'll be searching for this property frequently
    tags: Array,
    priority: {type: Number, default: 3},
    isActive: {type: Boolean, default: true}
});

contactSchema.methods.fullName = function(){
    return this.firstName + ' ' + this.lastName;
};

var Contact = mongoose.model('Contact', contactSchema);

module.exports = Contact;