const ResponseHelper = require("../helper/ResponseHelper");

module.exports = function (app) {
    app.get('/public', async function (req, res) {
        ResponseHelper.buildSuccessResponse(res, "public route requested successfuly");
    });
}