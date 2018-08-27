var offerModel = require('./../models/offerModels');

exports.addOffers = (req,res) =>{
    var newOffer = new offerModel({
        'RestaurantName': req.body.RestaurantName,
        'MainMenuOptionType': req.body.MainMenuOptionType,
        'Details': req.body.Details,
        'Location': req.body.Location,
        'DailyStartTime': req.body.DailyStartTime,
        'DailyStopTime': req.body.DailyStopTime,
        'ValidityFromDate': req.body.ValidityFromDate,
        'ValidityToDate': req.body.ValidityToDate,
        'Status': req.body.Status,
        'userID': req.body.userID,
        'Lat': req.body.Lat,
        'Lon':req.body.Lon
    });
    newOffer.save(function(err,result){
        //If any error from mlab or any uncaught exception
        if(err) {
            res.send(err);
            return;
        }
        else
            res.send("Congratulations, your offer has just been created. offer ID: "+result._id);
    });
};

exports.getAllOffers = (req,res) => {
    offerModel.
        find({
            Status:{$eq:'active'},
            ValidityFromDate:{$lt:Date.now()},
            ValidityToDate:{$gt:Date.now()}
        },
        {'RestaurantName':1, '_id':0, 'Details':1, 'Location':1, 'DailyStopTime':1,'DailyStartTime':1, 'ValidityToDate':1, 'ValidityFromDate':1},
        function(err,result){
        if(err) res.send(err);

        if(result.length!=0){
            res.send(result);
            return;
        }
        else
            res.send("No offers available")
        
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