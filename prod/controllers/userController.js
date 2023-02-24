"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = exports.logIn = exports.signUp = exports.authPage = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const User_1 = require("../models/User");
const validation_1 = require("../validation/validation");
const createToken_1 = require("../middleware/createToken");
const error_1 = require("../utils/error");
const http_status_codes_1 = require("http-status-codes");
const authPage = (_req, res) => {
    return res.status(http_status_codes_1.StatusCodes.OK).json({
        message: 'You are successfully Authenticated! , Only Auth Users watch this!'
    });
};
exports.authPage = authPage;
const signUp = async (req, res, next) => {
    try {
        const { error } = validation_1.userData.validate(req.body);
        if (error)
            throw new error_1.BadRequest(error.details[0].message);
        const { name, email, password } = req.body;
        const oldUser = await User_1.User.findOne({ email });
        if (oldUser) {
            throw new error_1.Conflict('This Email is already in used...');
        }
        else {
            const salt = await bcrypt_1.default.genSalt(10);
            const encryptedPassword = await bcrypt_1.default.hash(password, salt);
            const user = await User_1.User.create({
                name: name,
                email: email.toLowerCase(),
                password: encryptedPassword
            });
            await user.save();
            return res.status(http_status_codes_1.StatusCodes.CREATED).json({
                message: `User with Name '${req.body.name}' Created Successfully !`,
                user: user
            });
        }
    }
    catch (error) {
        return next(error);
    }
};
exports.signUp = signUp;
const logIn = async (req, res, next) => {
    try {
        const user = await User_1.User.findOne({ email: req.body.email });
        if (!user)
            throw new error_1.NotFound("This User doesn't exist...");
        const password = await bcrypt_1.default.compare(req.body.password, user.password);
        if (!password)
            throw new error_1.BadRequest('Invalid email or password...');
        const token = (0, createToken_1.createToken)(user._id);
        res.cookie('access_token', token, {
            httpOnly: true,
            secure: true,
            maxAge: createToken_1.maxAge * 1000
        });
        return res.status(http_status_codes_1.StatusCodes.OK).json({
            message: `Welcome ${user.name} !`,
            user: user,
            token: token
        });
    }
    catch (error) {
        return next(error);
    }
};
exports.logIn = logIn;
const logout = (_req, res, _next) => {
    return res.clearCookie('access_token').status(http_status_codes_1.StatusCodes.OK).json({
        status: res.status,
        message: 'Successfully Log Out'
    });
};
exports.logout = logout;
//# sourceMappingURL=userController.js.map