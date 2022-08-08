import { feelingEnum, supportedFilters, supportedFiltersValues } from "./thoughtModel"

const defaultFilter = {
  defaultFeeling : feelingEnum,
  defaultDate : "desc",
  defaultUpVotes: "desc",
  defaultDownVotes: "desc"
}
type queryParams  = {
  [key: string] : string
}

type santizedParams = {
  where? : Object
  orderBy: Object[]
}
const queryParamsSanitizer = (queryParams : queryParams ) : santizedParams | null => {

  // verify if request has the supported filters
  for(const key in queryParams){
    if(!(supportedFilters.includes(key))){
      return null
    }
  }

  // verify filters values to see if them are valid
  for(const key in queryParams){
    if(key === 'feeling'){
      if(!(feelingEnum.includes(queryParams[key]))){
        return null
      }
    }
    else{
      if(!(supportedFiltersValues.includes(queryParams[key]))){
        return null
      }
    }
  }

  // object that will contain sanitize filters
  const Filters : santizedParams = {
    orderBy: []
  }
  // add verified filters to their place
  for(const key in queryParams){
    if(key === "feeling"){
      Filters.where === {[key] : queryParams[key]}
    }
    else{
      Filters.orderBy.push({[key] : queryParams[key]})
    }
  }

  // add default params
  if(!(queryParams.hasOwnProperty("createdDate"))){
    Filters.orderBy.push({createdDate: "desc"})
  }
  return Filters

}
export {queryParamsSanitizer, queryParams}
