var mongoose = require('mongoose');

function validateField(string){
    return /^[a-z0-9_'-]+$/i.test(username);
    //TODO: This doesn't currently allow spaces; probably has other problems too
    //TODO: I should validate on frontend and backend, right?
}

var Contact = new mongoose.Schema({
    firstName: {type: String},
    lastName: {type: String},
    phone1: {type: String},
    phoneOthers: {type: String}, //TODO: Maybe store this as an Array? or just convert as necessary?
    email: {type: String},
    address: {type: String},
    notes: {type: String},
    contactFrequency: {type: Number, default: 0}
});

module.exports = File;