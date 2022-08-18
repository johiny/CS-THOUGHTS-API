import express from "express"
import {RequestError} from "../Interfaces"
import {z} from 'zod'
const jsonError = (err: RequestError, req: express.Request, res: express.Response, next: express.NextFunction) => {
  if(err instanceof SyntaxError && err.status === 400 && 'body' in err ){
    res.status(400).send({ status: 404, message: err.message });
  }
  else{
    next()
  }
}

const errorCatcher = (err: RequestError, req: express.Request, res: express.Response, next: express.NextFunction) => {
  if(err instanceof z.ZodError){
    res.status(400).json({message: 'error terrible', errorList: err.issues})
  }
  else{
    res.status(err.status || 404).json({message: 'error terrible', error: err})
  }
}

export {jsonError, errorCatcher}
