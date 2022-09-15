"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.queryParamsSanitizer = void 0;
const thoughtModel_1 = require("./thoughtModel");
const defaultFilter = {
    defaultFeeling: thoughtModel_1.feelingEnum,
    defaultDate: "desc",
    defaultUpVotes: "desc",
    defaultDownVotes: "desc"
};
const queryParamsSanitizer = (queryParams) => {
    // verify if request has the supported filters
    for (const key in queryParams) {
        if (!(thoughtModel_1.supportedFilters.includes(key))) {
            return null;
        }
    }
    // verify filters values to see if them are valid
    for (const key in queryParams) {
        if (key === 'feeling') {
            if (!(thoughtModel_1.feelingEnum.includes(queryParams[key]))) {
                return null;
            }
        }
        else {
            if (!(thoughtModel_1.supportedFiltersValues.includes(queryParams[key]))) {
                return null;
            }
        }
    }
    // object that will contain sanitize filters
    const Filters = {
        orderBy: []
    };
    // add verified filters to their place
    for (const key in queryParams) {
        if (key === "feeling") {
            Filters.where === { [key]: queryParams[key] };
        }
        else {
            Filters.orderBy.push({ [key]: queryParams[key] });
        }
    }
    // add default params
    if (!(queryParams.hasOwnProperty("createdDate"))) {
        Filters.orderBy.push({ createdDate: "desc" });
    }
    return Filters;
};
exports.queryParamsSanitizer = queryParamsSanitizer;
//# sourceMappingURL=filterService.js.map