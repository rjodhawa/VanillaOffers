module.exports = function(app){
    var offerController = require('./../controllers/offerController');
    
    app.route('/offers')
        .post(offerController.addOffers);
    app.route('/offers/all')
        .get(offerController.getAllOffers);
};