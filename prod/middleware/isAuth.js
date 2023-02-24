"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv = __importStar(require("dotenv"));
dotenv.config();
const error_1 = require("../utils/error");
const isAuth = (req, _res, next) => {
    const authHeader = req.headers['cookie'];
    const token = authHeader ? authHeader && authHeader.split('=')[1] : '';
    if (!token)
        throw new error_1.Authorized('Access denied. Not authorized...');
    try {
        const jwtSecretKey = process.env.SECRET_KEY ? process.env.SECRET_KEY : '';
        const decoded = jsonwebtoken_1.default.verify(token, jwtSecretKey);
        req.user = decoded;
        return next();
    }
    catch (error) {
        next(error);
        if (error.message === 'jwt expired') {
            throw new error_1.BadRequest('jwt token has expired..');
        }
        else {
            throw new error_1.Authorized('Invalid token...');
        }
    }
};
exports.isAuth = isAuth;
//# sourceMappingURL=isAuth.js.map