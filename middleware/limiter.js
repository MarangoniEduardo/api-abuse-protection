const moment = require("moment/moment");
const config = require('../config.json');
const ResponseHelper = require("../helper/ResponseHelper");

module.exports = async function (req, res, next) {
    try {
        const requestToken = req.headers.token;
        let collection = req.API_VARIABLES.db.collection('limit_logs');
        let valid = false, reqCounter, intervalUnit = 'hour', nextReqAt;
        let timeQuery = { createdAt: { $gte: moment().startOf(intervalUnit).toDate(), $lt: moment().toDate() } }, tokenExists = config.tokens[requestToken], limit;

        if (requestToken && requestToken.length > 0 && tokenExists) {
            reqCounter = await collection.count({ token: requestToken, ...timeQuery });
            limit = config.tokens[requestToken].reqLimitPerHour;

            if (reqCounter < limit) {
                valid = true;
                await collection.insertOne({ createdAt: moment().toDate(), token: requestToken });
            }
        } else {
            const ip = req.connection.remoteAddress;
            reqCounter = await collection.count({ ip: ip, ...timeQuery });
            limit = config.globalReqLimitPerHour;

            if (reqCounter < limit) {
                valid = true;
                await collection.insertOne({ createdAt: moment().toDate(), ip: ip });
            }
        }

        // console.log(await collection.find({ token: requestToken, ...timeQuery }).sort({ createdAt: -1 }).toArray());

        if (!valid) {
            nextReqAt = moment().endOf(intervalUnit).format("DD/MM/YYYY HH:mm:ss");
            return ResponseHelper.buildCustomErrorResponse(res, 429, `Hourly request limit reached (${limit} reqs), you can send requests again after ${nextReqAt}`);
        } else {
            return next();
        }
    } catch (e) {
        return ResponseHelper.buildCustomErrorResponse(res, 500, "Internal server error");
    }
};