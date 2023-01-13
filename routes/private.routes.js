const ResponseHelper = require("../helper/ResponseHelper");

module.exports = function (app, routeAuth) {
    app.get('/private', routeAuth, async function (req, res) {
        ResponseHelper.buildSuccessResponse(res, "private route requested successfuly");
    });
}