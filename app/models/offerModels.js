var mongoose = require('mongoose');
var schema = mongoose.schema;

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
    }
});

module.exports = mongoose.model('offers',newSchema);