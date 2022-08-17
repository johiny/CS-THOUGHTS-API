import { z } from 'zod'
import { feelingEnum, supportedFiltersValues } from "./thoughtModel"

const thoughtsFilters = z.object({
    feeling: z.enum(feelingEnum).optional(),
    upVotes: z.enum(supportedFiltersValues).optional(),
    DownVotes: z.enum(supportedFiltersValues).optional(),
    createdDate: z.enum(supportedFiltersValues).optional().default('desc')
}).strict()

export {thoughtsFilters}