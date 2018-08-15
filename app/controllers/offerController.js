var offerModel = require('./../models/offerModels');

exports.addOffers = (req,res) =>{
    var newOffer = new offerModel({
        RestaurantName: req.body.RestaurantName,
        TimeOfOffer: req.body.TimeOfOffer,
        Location: req.body.Location,
        Details: req.body.Details,
        MainMenuOptionType:req.body.MainMenuOptionType,
        Status: req.body.Status
    });
    newOffer.save(function(err,result){
        if(err) res.send(err);
        res.send(req);
    });
};

