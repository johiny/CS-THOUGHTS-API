"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.modifyThought = exports.createThought = exports.getThoughtbyID = exports.thoughtsFilters = void 0;
const zod_1 = require("zod");
const thoughtModel_1 = require("./thoughtModel");
const thoughtsFilters = zod_1.z.object({
    feeling: zod_1.z.enum(thoughtModel_1.feelingEnum).optional(),
    upVotes: zod_1.z.enum(thoughtModel_1.supportedFiltersValues).optional(),
    DownVotes: zod_1.z.enum(thoughtModel_1.supportedFiltersValues).optional(),
    createdDate: zod_1.z.enum(thoughtModel_1.supportedFiltersValues).optional().default('desc')
}).strict();
exports.thoughtsFilters = thoughtsFilters;
const getThoughtbyID = zod_1.z.object({
    id: zod_1.z.preprocess(val => Number(val), zod_1.z.number().positive())
}).strict();
exports.getThoughtbyID = getThoughtbyID;
const createThought = zod_1.z.object({
    byUsername: zod_1.z.string().regex(new RegExp("^[A-Za-z][A-Za-z0-9]*$"), { message: "username cannot have white spaces" }).min(3).max(16),
    content: zod_1.z.string().min(16).max(640),
    feeling: zod_1.z.enum(thoughtModel_1.feelingEnum)
}).strict();
exports.createThought = createThought;
const modifyThought = zod_1.z.object({
    content: zod_1.z.string().min(16).max(640).optional(),
    feeling: zod_1.z.enum(thoughtModel_1.feelingEnum).optional()
}).strict({ message: "you are using incorrect parameters you can only update thought content and feeling fields" }).refine(({ content, feeling }) => content !== undefined || feeling !== undefined, { message: "you have to send a least one field to update content or feeling" });
exports.modifyThought = modifyThought;
//# sourceMappingURL=validationSchemas.js.map