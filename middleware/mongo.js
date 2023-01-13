const config = require('../config.json');
const ResponseHelper = require("../helper/ResponseHelper");
const { MongoClient } = require('mongodb');

module.exports = async function (req, res, next) {
    try {
        if(!req.API_VARIABLES) req.API_VARIABLES = {};

        req.API_VARIABLES.mongo = new MongoClient(config.database.url);
        await req.API_VARIABLES.mongo.connect();
    
        req.API_VARIABLES.db = req.API_VARIABLES.mongo.db(config.database.dbName);
        return next();
    } catch(e) {
        return ResponseHelper.buildCustomErrorResponse(res, 500, "Internal server error");
    }
};