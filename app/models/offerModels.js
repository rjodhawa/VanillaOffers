var mongoose = require('mongoose');
var schema = mongoose.Schema;

var newSchema = new schema({
    RestaurantName: String,
    TimeOfOffer: String,
    Location: String,
    Details: String,
    MainMenuOptionType:[{
        enum: ['breakfast','lunch','dinner','delivery', 'Drinks & NightLife','Takeout'],
        type: String
    }],
    Status: {
        enum:['active','inactive'],
        default: 'active',
        type: String
    },
    validityToDate: String,
    validityFromDate: String
});

module.exports = mongoose.model('offers',newSchema);