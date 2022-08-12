import express from "express"
import {RequestError} from "../Interfaces"

const jsonError = (err: RequestError, req: express.Request, res: express.Response, next: express.NextFunction) => {
  if(err instanceof SyntaxError && err.status === 400 && 'body' in err ){
    res.status(400).send({ status: 404, message: err.message });
  }
  else{
    next()
  }
}

export {jsonError}
