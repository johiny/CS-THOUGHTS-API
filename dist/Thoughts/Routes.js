"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const index_1 = require("../index");
const index_2 = require("../index");
const ownFilterService_1 = require("./ownFilterService");
const dataValidationMiddlewares_1 = require("../Middlewares/dataValidationMiddlewares");
const validationSchemas_1 = require("./validationSchemas");
const router = express_1.default.Router();
router.get("/", (0, dataValidationMiddlewares_1.validationFactory)("query", validationSchemas_1.thoughtsFilters), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const filters = (0, ownFilterService_1.queryBuilder)(req.query);
    try {
        const thoughts = yield index_1.prisma.thoughts.findMany(filters);
        res.status(200).json(thoughts);
        return;
    }
    catch (err) {
        next(err);
    }
}));
router.get("/:id", (0, dataValidationMiddlewares_1.validationFactory)('params', validationSchemas_1.getThoughtbyID), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    try {
        const thought = yield index_1.prisma.thoughts.findUnique({ where: { id: id } });
        res.status(200).json(thought);
        return;
    }
    catch (err) {
        next(err);
    }
}));
router.post("/", (0, dataValidationMiddlewares_1.validationFactory)('body', validationSchemas_1.createThought), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let newThought = req.body;
    try {
        newThought = yield index_1.prisma.thoughts.create({
            data: newThought
        });
        res.status(201).json({ message: "the thought has been created", newThought: newThought });
        return;
    }
    catch (err) {
        next(err);
    }
}));
router.patch("/:id", (0, dataValidationMiddlewares_1.validationFactory)('params', validationSchemas_1.getThoughtbyID), (0, dataValidationMiddlewares_1.validationFactory)('body', validationSchemas_1.modifyThought), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    const newValues = req.body;
    try {
        const updateThought = yield index_1.prisma.thoughts.update({
            where: { id: id },
            data: newValues
        });
        res.status(200).json(Object.assign({ message: "The thought has been modified" }, updateThought));
        return;
    }
    catch (err) {
        next(err);
    }
}));
router.delete("/:id", (0, dataValidationMiddlewares_1.validationFactory)('params', validationSchemas_1.getThoughtbyID), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    try {
        const thoughtDeleted = yield index_1.prisma.thoughts.delete({ where: { id: id } });
        res.status(200).json({ message: "The thought has been deleted", id: thoughtDeleted.id });
        return;
    }
    catch (err) {
        next(err);
    }
}));
router.patch("/:id/upVote", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    const ip = req.ip;
    console.log(ip);
    const isCoolDown = index_2.coolDown.verifyCoolDown(ip, id, "positive");
    if (isCoolDown != false) {
        res.status(425).json({ message: `You already like this thought in less than an hour, you can do it again in ${isCoolDown} minutes` });
        return;
    }
    try {
        const thoughtNewValues = yield index_1.prisma.thoughts.update({
            where: { id: id },
            data: { upVotes: { increment: 1 } }
        });
        index_2.coolDown.addToIpList(ip, id, "positive");
        res.status(200).json(Object.assign({ message: "Your Like has been saved!" }, thoughtNewValues));
    }
    catch (err) {
        next(err);
    }
}));
router.patch("/:id/downVote", (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = parseInt(req.params.id);
    const ip = req.ip;
    const isCoolDown = index_2.coolDown.verifyCoolDown(ip, id, "negative");
    if (isCoolDown) {
        res.status(425).json({ message: `You already dislike this thought in less than an hour,  you can do it again in ${isCoolDown} minutes` });
        return;
    }
    try {
        const thoughtNewValues = yield index_1.prisma.thoughts.update({
            where: { id: id },
            data: { DownVotes: { increment: 1 } }
        });
        index_2.coolDown.addToIpList(ip, id, "negative");
        res.status(200).json(Object.assign({ message: "Your Dislike has been saved!" }, thoughtNewValues));
    }
    catch (err) {
        next(err);
    }
}));
exports.default = router;
//# sourceMappingURL=Routes.js.map