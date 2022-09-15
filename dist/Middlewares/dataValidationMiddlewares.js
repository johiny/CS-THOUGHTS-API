"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validationFactory = void 0;
const validationFactory = (dataPlace, validationSchema) => {
    return (req, res, next) => {
        try {
            validationSchema.parse(req[dataPlace]);
            next();
        }
        catch (err) {
            next(err);
        }
    };
};
exports.validationFactory = validationFactory;
//# sourceMappingURL=dataValidationMiddlewares.js.map