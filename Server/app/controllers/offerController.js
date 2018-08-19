var offerModel = require('./../models/offerModels');

exports.addOffers = (req,res) =>{
    var newOffer = new offerModel({
        'RestaurantName': req.body.RestaurantName,
        'MainMenuOptionType': req.body.MainMenuOptionType,
        'Details': req.body.Details,
        'Location': req.body.Location,
        'PinCode':req.body.PinCode,
        'TimeOfOfferValidityDaily': req.body.TimeOfOfferValidityDaily,
        'ValidityFromDate': req.body.ValidityFromDate,
        'ValidityToDate': req.body.ValidityToDate,
        'Status': req.body.Status
    });
    newOffer.save(function(err,result){
        //If any error from mlab or any uncaught exception
        if(err) res.send(err);
        res.send("Congratulations, your offer has just been created. Please take a note of the offer id, as it may be used to update the status (active/inactive) or perofrom any other changes. Also you can use this ID to delete the offer. (Don't use quotes while saving this ID).\nYour ID: "+result._id);
    });
};

exports.getAllOffers = (req,res) => {
    offerModel.
        find({
            Status:{$eq:'active'},
            ValidityFromDate:{$lt:Date.now()},
            ValidityToDate:{$gt:Date.now()}
        },
        {'RestaurantName':1, '_id':0, 'Details':1, 'Location':1, 'TimeOfOfferValidityDaily':1, 'ValidityToDate':1, 'ValidityFromDate':1},
        function(err,result){
        if(err) res.send(err);

        if(result.length===0){
            res.send("No offers available");
            return;
        }
        res.send(result);
    });
};

exports.getOffersBySingleQuery = (req,res) => {
    offerModel.
        find({
            Status:{$eq:'active'},
            ValidityFromDate:{$lt:Date.now()},
            ValidityToDate:{$gt:Date.now()},
            $or:[
                {'RestaurantName':req.query.name},
                {'_id':req.query.id},
                {'PinCode':req.query.pin},
                {'MainMenuOptionType':{$in:
                    (typeof req.query.menu==='undefined'?"x":req.query.menu).split("-")
                }}
            ],
        },
        {'RestaurantName':1, '_id':0, 'Details':1, 'Location':1, 'TimeOfOfferValidityDaily':1, 'ValidityToDate':1, 'ValidityFromDate':1},
        function(err,result){
        if(err) {
            res.send(err);
            return;
        }
        if(result.length===0){
            res.send("No offers available");
            return;
        }
        res.send(result);
    });
};