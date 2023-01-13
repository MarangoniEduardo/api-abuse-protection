module.exports = class ResponseHelper {
    static buildSuccessResponse(res, output) {
        res.json({ "response": output });
        res.end();
    }

    static buildErrorResponse(res, error) {
        console.log(error);

        res.status(500).json({ "msg": "Internal Error" });
        res.end();
    }

    static buildCustomSuccessResponse(res, obj) {
        res.json(obj);
        res.end();
    }

    static buildCustomErrorResponse(res, httpCode, msg) {
        res.status(httpCode).json({ "msg": msg });
        res.end();
    }

    static buildMissingParamsResponse(res) {
        res.status(422).json({ "msg": "Missing required parameters" });
        res.end();
    }
}