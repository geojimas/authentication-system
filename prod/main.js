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
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const body_parser_1 = require("body-parser");
const path_1 = __importDefault(require("path"));
const dotenv = __importStar(require("dotenv"));
dotenv.config();
const errorHandler_1 = require("./middleware/errorHandler");
const db_1 = require("./database/db");
const router_1 = require("./routes/router");
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    credentials: true,
    origin: ['http://localhost:3000']
}));
app.use((0, helmet_1.default)());
app.use((0, body_parser_1.json)());
app.use(express_1.default.urlencoded({ extended: true }));
app.use('/api', router_1.router);
app.use(errorHandler_1.handleErrors);
if (!parseInt(process.env.PORT)) {
    process.exit(1);
}
app.use(express_1.default.static(path_1.default.join(__dirname, '../client/dist')));
app.get('/*', (_req, res) => {
    res.sendFile(path_1.default.join(__dirname, '../client/dist', 'index.html'));
});
(0, db_1.connectDB)();
app.listen(process.env.PORT || 5000, () => {
    console.log('-----------------------------');
    if (process.env.NODE_ENV === 'development') {
        console.log(`server start running at port ${process.env.PORT}`);
        console.log(`Server is Live here -> http://localhost:${process.env.PORT}`);
    }
    else
        console.log(`Server is Live in production URL`);
});
//# sourceMappingURL=main.js.map