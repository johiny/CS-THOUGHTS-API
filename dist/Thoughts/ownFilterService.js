"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.queryBuilder = void 0;
const thoughtModel_1 = require("./thoughtModel");
const defaultFilter = {
    defaultFeeling: thoughtModel_1.feelingEnum,
    defaultDate: "desc",
    defaultUpVotes: "desc",
    defaultDownVotes: "desc"
};
// convert sanitizer from a simple function to a middleware
// const queryParamsSanitizer = (queryParams : queryParams) : santizedParams | null => {
//   // verify if request has the supported filters
//   for(const key in queryParams){
//     if(!(supportedFilters.includes(key))){
//       return null
//     }
//   }
//   // verify filters values to see if them are valid
//   for(const key in queryParams){
//     if(key === 'feeling'){
//       if(!(feelingEnum.includes(queryParams[key]))){
//         return null
//       }
//     }
//     else{
//       if(!(supportedFiltersValues.includes(queryParams[key]))){
//         return null
//       }
//     }
//   }
const queryBuilder = (queryParams) => {
    // object that will contain sanitize filters
    const Filters = {
        where: undefined,
        orderBy: [],
        skip: 0,
        take: 120,
    };
    // add verified filters to their place
    for (const key in queryParams) {
        if (key === "feeling") {
            Filters.where = { [key]: queryParams[key] };
        }
        else if (key === "skip") {
            Filters.skip = parseInt(queryParams[key]);
        }
        else if (key === "take") {
            Filters.take = parseInt(queryParams[key]);
        }
        else {
            Filters.orderBy.push({ [key]: queryParams[key] });
        }
    }
    return Filters;
};
exports.queryBuilder = queryBuilder;
//# sourceMappingURL=ownFilterService.js.map