var mongoose = require('mongoose');
const date = require('date-and-time');
var schema = mongoose.Schema;

var newSchema = new schema({
    RestaurantName: String,
    MainMenuOptionType:[{
        enum: ['breakfast','lunch','dinner','delivery', 'Drinks & NightLife','Takeout'],
        type: String
    }],
    Details: String,
    
    Location: [{
        type: String
    }],
    PinCode:[{
        type: Number
    }],
    
    TimeOfOfferValidityDaily: String,
    
    ValidityFromDate: Date,
    ValidityToDate: Date,
    
    DateOfPostingOffer: {
        type: Date,
        default: Date.now()
    },
    Status: {
        enum:['active','inactive'],
        default: 'active',
        type: String
    }
});

module.exports = mongoose.model('offers',newSchema);