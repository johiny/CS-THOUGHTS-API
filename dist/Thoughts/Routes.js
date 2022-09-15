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
const client_1 = require("@prisma/client");
const ownFilterService_1 = require("./ownFilterService");
const dataValidationMiddlewares_1 = require("../Middlewares/dataValidationMiddlewares");
const validationSchemas_1 = require("./validationSchemas");
const router = express_1.default.Router();
const prisma = new client_1.PrismaClient();
// const coolDown = new coolDownService()
router.get("/", (0, dataValidationMiddlewares_1.validationFactory)("query", validationSchemas_1.thoughtsFilters), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const filters = (0, ownFilterService_1.queryBuilder)(req.query);
    try {
        const thoughts = yield prisma.thoughts.findMany(filters);
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
        const thought = yield prisma.thoughts.findUnique({ where: { id: id } });
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
        newThought = yield prisma.thoughts.create({
            data: newThought
        });
        res.status(201).json(Object.assign({ message: "the thought has been created" }, newThought));
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
        const updateThought = yield prisma.thoughts.update({
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
        const thoughtDeleted = yield prisma.thoughts.delete({ where: { id: id } });
        res.status(200).json({ message: "The thought has been deleted", id: thoughtDeleted.id });
        return;
    }
    catch (err) {
        next(err);
    }
}));
// router.patch("/:id/upVote", async (req, res, next) => {
//   const id = parseInt(req.params.id)
//   const ip = req.ip
//   if(coolDown.verifyCoolDown(ip, id, "positive")){
//     res.status(425).json({message: "you already upvote this thought in less than an hour you can only upvote the same comment hourly"})
//     return
//   }
//   try{
//   const thoughtNewValues = await prisma.thoughts.update({
//     where: {id: id},
//     data: {upVotes : {increment: 1}}
//   })
//   coolDown.addToIpList(ip, id, "positive")
//   res.status(200).json({message: "the upvotes has been updated", ...thoughtNewValues})}
//   catch(err){
//     next(err)
//   }
// })
// router.patch("/:id/downVote", async (req, res, next) => {
//   const id = parseInt(req.params.id)
//   const ip = req.ip
//   if(coolDown.verifyCoolDown(ip, id, "negative")){
//     res.status(425).json({message: "you already upvote this thought in less than an hour you can only upvote the same comment hourly"})
//     return
//   }
//   try{
//   const thoughtNewValues = await prisma.thoughts.update({
//     where: {id: id},
//     data: {DownVotes : {increment: 1}}
//   })
//   coolDown.addToIpList(ip, id, "negative")
//   res.status(200).json({message: "the downvotes has been updated", ...thoughtNewValues})
//   }
//   catch(err){
//     next(err)
//   }
// })
exports.default = router;
//# sourceMappingURL=Routes.js.map