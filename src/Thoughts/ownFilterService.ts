import { feelingEnum, supportedFilters, supportedFiltersValues } from "./thoughtModel"
import  express  from "express"
const defaultFilter = {
  defaultFeeling : feelingEnum,
  defaultDate : "desc",
  defaultUpVotes: "desc",
  defaultDownVotes: "desc"
}
type queryParams  = {
  [key: string] : string
}

type organizedQueryParams = {
  where: Object | undefined
  orderBy: Object[]
}
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

const queryBuilder = (queryParams: queryParams) : organizedQueryParams => {
  // object that will contain sanitize filters
  const Filters : organizedQueryParams = {
    where: undefined,
    orderBy: []
  }

  // add verified filters to their place
  for(const key in queryParams){
    if(key === "feeling"){
      Filters.where = {[key] : queryParams[key]}
    }
    else{
      Filters.orderBy.push({[key] : queryParams[key]})
    }
  }

  return Filters

}
export {queryParams, queryBuilder}
