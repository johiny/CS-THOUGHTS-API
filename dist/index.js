"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const Router_1 = __importDefault(require("./Router"));
const errorMiddlewares_1 = require("./Middlewares/errorMiddlewares");
const cors = require('cors');
// api config
dotenv_1.default.config();
const port = process.env.PORT;
// api start
const app = (0, express_1.default)();
app.use(cors({
    origin: process.env.ALLOWED_ORIGIN
}));
app.use(express_1.default.json());
app.use(errorMiddlewares_1.jsonError);
(0, Router_1.default)(app);
app.use(errorMiddlewares_1.errorCatcher);
app.listen(port);
//# sourceMappingURL=index.js.map