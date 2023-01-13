const config = require('../../config.json');
const ResponseHelper = require("../../helper/ResponseHelper");

module.exports = async function (req, res, next) {
    try {
        const requestToken = req.headers.token;
        if(!requestToken) return ResponseHelper.buildCustomErrorResponse(res, 401, `Authentication required for private routes`);

        let valid = false;

        if (config.tokens[requestToken]) {
            valid = true;
        }
        
        if (!valid) {
            return ResponseHelper.buildCustomErrorResponse(res, 403, `Invalid Credentials`);
        } else {
            return next();
        }
    } catch (e) {
        return ResponseHelper.buildCustomErrorResponse(res, 500, "Internal server error");
    }
};