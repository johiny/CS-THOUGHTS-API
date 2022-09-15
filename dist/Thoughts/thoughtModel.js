"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.supportedFiltersValues = exports.supportedFilters = exports.feelingEnum = exports.requiredValuesToCreateThought = exports.authorizedKeysToChangeOnUpdate = void 0;
const authorizedKeysToChangeOnUpdate = ["byUsername", "content", "feeling"];
exports.authorizedKeysToChangeOnUpdate = authorizedKeysToChangeOnUpdate;
const requiredValuesToCreateThought = ["byUsername", "content", "feeling"];
exports.requiredValuesToCreateThought = requiredValuesToCreateThought;
const feelingEnum = ["positive", "negative"];
exports.feelingEnum = feelingEnum;
const supportedFilters = ["feeling", "upVotes", "DownVotes", "createdDate"];
exports.supportedFilters = supportedFilters;
const supportedFiltersValues = ["desc", "asc"];
exports.supportedFiltersValues = supportedFiltersValues;
//# sourceMappingURL=thoughtModel.js.map