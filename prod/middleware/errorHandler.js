"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleErrors = void 0;
const error_1 = require("../utils/error");
const http_status_codes_1 = require("http-status-codes");
const handleErrors = (error, _req, res, _next) => {
    if (error instanceof error_1.GeneralError) {
        return res.status(error.getCode()).json({
            status: res.statusCode,
            error: error,
            message: error.message,
        });
    }
    return res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json({
        status: res.statusCode,
        error: error,
        message: error.message,
    });
};
exports.handleErrors = handleErrors;
//# sourceMappingURL=errorHandler.js.map