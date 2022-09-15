"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Routes_1 = __importDefault(require("./Thoughts/Routes"));
const express_1 = __importDefault(require("express"));
const Router = (app) => {
    const router = express_1.default.Router();
    app.use("/api/v1", router);
    router.use("/thoughts", Routes_1.default);
    app.get("/", (req, res) => {
        res.send("hello! I'm CS50-Thoughts API make me a query!");
    });
};
exports.default = Router;
//# sourceMappingURL=Router.js.map