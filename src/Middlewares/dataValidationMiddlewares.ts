import Express  from 'express'
import {z} from 'zod'

const validationFactory = <validationSchema extends z.ZodTypeAny> (dataPlace : keyof Express.Request, validationSchema : validationSchema) => {
    return (req : Express.Request, res : Express.Response, next : Express.NextFunction) => {
        try{
            validationSchema.parse(req[dataPlace])
            next()
        }
        catch(err){
                next(err)
        }
    }
}

export {validationFactory}
