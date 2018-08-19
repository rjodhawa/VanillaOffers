var configInfo = require('./dbVanillaConfigInfo');
module.exports=(
    "mongodb://"+configInfo.username +":"+configInfo.password+"@ds121982.mlab.com:21982/db-vanillaoffers"
);