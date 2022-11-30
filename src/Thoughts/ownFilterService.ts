import { feelingEnum } from "./thoughtModel"

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
  where: {[key: string] : string | number}
  orderBy: Object[]
  skip: number
  take:number
}

const queryBuilder = (queryParams: queryParams) : organizedQueryParams => {
  // object that will contain sanitize filters
  const Filters : organizedQueryParams = {
    where: {},
    orderBy: [],
    skip: 0,
    take: 120,
  }

  // add verified filters to their place
  for(const key in queryParams){
    if(key === "feeling"){
      Filters.where[key] = queryParams[key]
    }
    else if(key === "cs50year"){
      Filters.where[key] = queryParams[key]
    }
    else if(key === "skip"){
      Filters.skip = parseInt(queryParams[key])
    }
    else if(key === "take"){
      Filters.take = parseInt(queryParams[key])
    }
    else{
      Filters.orderBy.push({[key] : queryParams[key]})
    }
  }

  return Filters

}
export {queryParams, queryBuilder}
