module.exports = function(app){
    var offerController = require('./../controllers/offerController');
    
    app.route('/offer')
        .post(offerController.addOffers);
};