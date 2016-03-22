var mongoose = require('mongoose');

function validateField(string){
    return /^[a-z0-9_'-]+$/i.test(username);
    //TODO: This doesn't currently allow spaces; probably has other problems too
    //TODO: I should validate on frontend and backend, right?
}

var contactSchema = mongoose.Schema({
    // I can generate dummy data from this template I put together:
    // http://beta.json-generator.com/4kzsToHpl
    name: {
        firstName: String,
        middleName: String, // usually omitted
        lastName: String
    },
    phone1: String,
    phoneOthers: String, //TODO: Maybe store this as an Array? or just convert as necessary?
    email: String,
    near: String,
    notes: String,
    lastContacted: Date,
    contactFrequency: {type: Number, default: 0}, // # days after which I should contact again
    contactNext: Date, // TODO: Should I replace this with a virtual property?
    tags: Array,
    priority: Number,
    isActive: Boolean
});

contactSchema.methods.fullName = function(){
    return this.firstName + ' ' + this.lastName;
};

var Contact = mongoose.model('Contact', contactSchema);

module.exports = Contact;