var mongoose = require('mongoose');

function validateField(string){
    return /^[a-z0-9_'-]+$/i.test(username);
    //TODO: This doesn't currently allow spaces; probably has other problems too
    //TODO: I should validate on frontend and backend, right?
}

var contactSchema = mongoose.Schema({
    // I can generate dummy data from this template I put together:
    // http://beta.json-generator.com/4kzsToHpl
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
    contactNext: Date,
    // TODO: Validation/processing: date or number or string - something that can be converted to a date. Or maybe just be more strict.
    // I'm expecting a date string in a certain format from the input[type="date"] element, and if I don't get something in that format,
    // display an error. Or do some browsers not support that input type?
    tags: [String],
    priority: {type: Number, default: 3}, // TODO: Validation/processing: number 0-5, inclusive
    isActive: {type: Boolean, default: true} // TODO: Validation/processing: boolean
});

//nameFull: String, // This is what user enters when creating a contact; use this to guess First and Last (and
    // sometimes Middle) names

contactSchema.virtual('nameFull')
    .get(function(){
        return this.firstName + ' ' + this.lastName;
    })
    .set(function(name){
        var first, last, // undefined
            nameSlicePoint = name.indexOf(' ');
        if(nameSlicePoint !== -1){ // User entered at least two names, i.e. there was a space in their entry
            this.nameFirst = name.slice(0,nameSlicePoint);
            this.nameLast = name.slice(nameSlicePoint+1);
        }else{ // If no space, guess they entered contact's first name
            this.nameFirst = name;
        }
    });

contactSchema.virtual('tagString')
    .get(function(){
        return this.tags.join(', ');
    })
    .set(function(str){
        this.tags = str.replace(/, +/g, ',').split(',');
    });

contactSchema.virtual('phoneOtherString')
    .get(function(){
        return this.phoneOthers.join(', ');
    })
    .set(function(str){
        this.phoneOthers = str.replace(/, +/g, ',').split(',');
    });

contactSchema.virtual('lastContactedStr')
    .get(function(){
        return this.lastContacted.toDateString();
    }); // No setter. The getter is used to display the date in human-readable format. I'm not expecting to pass a date back
        // to MongoDB in this format.

contactSchema.virtual('lastContactedInputStr')
    .get(function(){
        var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
            dateArr = this.lastContacted.toDateString().split(' '),
            month = months.indexOf(dateArr[1]) + 1,
            monthPad = month < 10
                ? '0'
                : '',
            inputStr = dateArr[3] + '-' + monthPad + month + '-' + dateArr[2];
        return inputStr;
    })
    .set(function(str){
        this.lastContacted = new Date(str);
    });

/* VIRTUAL PROPERTY TEMPLATE
contactSchema.virtual('VIRTUAL_PROPERTY_NAME')
    .get(function(){
        return WHATEVER_IT_RETURNS;
    })
    .set(function(NAME_OF_INPUT){
        SET_APPROPRIATE_REAL_PROPERTIES;
    });
*/


var Contact = mongoose.model('Contact', contactSchema);

module.exports = Contact;