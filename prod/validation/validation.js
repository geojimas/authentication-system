"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userData = void 0;
const joi_1 = __importDefault(require("joi"));
const joi_password_complexity_1 = __importDefault(require("joi-password-complexity"));
exports.userData = joi_1.default.object({
    name: joi_1.default.string().min(3).max(200).required(),
    email: joi_1.default.string().email().max(200).required(),
    password: (0, joi_password_complexity_1.default)({
        min: 6,
        max: 25,
        lowerCase: 1,
        numeric: 1,
        requirementCount: 4,
    }),
});
//# sourceMappingURL=validation.js.map