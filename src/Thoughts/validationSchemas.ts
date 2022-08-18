import { z } from 'zod'
import { feelingEnum, supportedFiltersValues } from "./thoughtModel"

const thoughtsFilters = z.object({
    feeling: z.enum(feelingEnum).optional(),
    upVotes: z.enum(supportedFiltersValues).optional(),
    DownVotes: z.enum(supportedFiltersValues).optional(),
    createdDate: z.enum(supportedFiltersValues).optional().default('desc')
}).strict()

const getThoughtbyID = z.object({
  id: z.preprocess(val => Number(val),
  z.number().positive())
}).strict()

const createThought = z.object({
  byUsername : z.string().regex(new RegExp("^[A-Za-z][A-Za-z0-9]*$"), {message: "username cannot have white spaces"}).min(3).max(16),
  content: z.string().min(16).max(640),
  feeling: z.enum(feelingEnum)
}).strict()

const modifyThought = z.object({
  content: z.string().min(16).max(640).optional(),
  feeling: z.enum(feelingEnum).optional()
}).strict({message: "you are using incorrect parameters you can only update thought content and feeling fields"}).refine(({content, feeling}) => content !== undefined || feeling !== undefined, {message: "you have to send a least one field to update content or feeling"})

export {thoughtsFilters, getThoughtbyID, createThought, modifyThought}
