"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorCatcher = exports.jsonError = void 0;
const zod_1 = require("zod");
const jsonError = (err, req, res, next) => {
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
        res.status(400).send({ status: 404, message: err.message });
    }
    else {
        next();
    }
};
exports.jsonError = jsonError;
const errorCatcher = (err, req, res, next) => {
    if (err instanceof zod_1.z.ZodError) {
        res.status(400).json({ message: 'error terrible de Zod', errorList: err.issues });
    }
    else {
        res.status(err.status || 404).json({ message: 'error terrible', error: err });
    }
};
exports.errorCatcher = errorCatcher;
//# sourceMappingURL=errorMiddlewares.js.map