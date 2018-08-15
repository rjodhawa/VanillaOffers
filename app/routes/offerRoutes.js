module.exports = function(app){
    var offerController = require('./../controllers/offerController');
    
    app.route('/offers')
        .post(offerController.addOffers);
};