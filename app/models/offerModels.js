var mongoose = require('mongoose');
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
    }
});
newSchema.pre('save',function(){
    this.DailyStartTime = (this.TimeOfOfferValidityDaily.split(" to "))[0];
    this.DailyStopTime = (this.TimeOfOfferValidityDaily.split(" to "))[1];
});
module.exports = mongoose.model('offers',newSchema);