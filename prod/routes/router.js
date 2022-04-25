"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const isAuth_1 = require("../middleware/isAuth");
const userController_1 = require("../controllers/userController");
exports.router = express_1.default.Router();
exports.router.post('/register', userController_1.signUp);
exports.router.post('/login', userController_1.logIn);
exports.router.get('/logout', isAuth_1.isAuth, userController_1.logout);
exports.router.get('/dashboard', isAuth_1.isAuth, userController_1.authPage);
//# sourceMappingURL=router.js.map