const ResponseHelper = require("../helper/ResponseHelper");

module.exports = function (app) {
    app.get('/public', async function (req, res) {
        // let logs = req.API_VARIABLES.db.collection('limit_logs');

        // console.log(await logs.find({}).toArray());

        ResponseHelper.buildSuccessResponse(res, "public route request successfuly");
    });
}