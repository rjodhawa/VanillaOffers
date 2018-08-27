var mongoose = require('mongoose');
var schema = mongoose.Schema;

var newSchema = new schema({
    RestaurantName: String,
    MainMenuOptionType:[{
        enum: ['breakfast','lunch','dinner','delivery', 'Drinks','Takeout'],
        type: String
    }],
    Details: String,
    
    Location: [{
        type: String
    }],
    
    DailyStartTime: String,
    DailyStopTime: String,
    
    ValidityFromDate: Date,
    ValidityToDate: Date,
    
    DateOfPostingOffer: {
        type: Date,
        default: Date()
    },
    Status: {
        enum:['active','inactive'],
        default: 'active',
        type: String
    },
    userID: String,
});

module.exports = mongoose.model('offers',newSchema);