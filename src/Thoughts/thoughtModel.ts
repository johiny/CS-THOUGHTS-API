type Thought = {
  id?: number
  byUsername : string
  content : string
  feeling :  "positive" | "negative"
  upVotes : number
  DownVotes : number
  createdDate : string
}

const authorizedKeysToChangeOnUpdate = ["byUsername","content","feeling"]
const requiredValuesToCreateThought = ["byUsername","content","feeling"]
const feelingEnum = ["positive", "negative"]
const supportedFilters = ["feeling", "upVote", "DownVotes", "createdDate"]
const supportedFiltersValues = ["desc","asc"]
type feelingType = "positive" | "negative"
export {Thought, authorizedKeysToChangeOnUpdate, requiredValuesToCreateThought, feelingEnum, feelingType, supportedFilters, supportedFiltersValues}
