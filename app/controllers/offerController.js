var offerModel = require('./../models/offerModels');
var date = require('date-and-time');
exports.addOffers = (req,res) =>{
    var newOffer = new offerModel({
        'RestaurantName': req.body.RestaurantName,
        'MainMenuOptionType': req.body.MainMenuOptionType,
        'Details': req.body.Details,
        'Location': req.body.Location,
        'PinCode':req.body.PinCode,
        'TimeOfOfferValidityDaily': req.body.TimeOfOfferValidityDaily,
        'ValidityFromDate': req.body.ValidityFromDate,
        'ValidityToDate': req.body.ValidityToDate
    });

    newOffer.save(function(err,result){
        //If any error from mlab or any uncaught exception
        if(err) res.send(err);
        else res.send("Congratulations, your offer has just been created. Please take a note of the offer id, as it may be used to update the status (active/inactive) or perofrom any other changes. Also you can use this ID to delete the offer. (Don't use quotes while saving this ID).\nYour ID: "+result._id);
    });
};
