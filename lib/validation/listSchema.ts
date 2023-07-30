import * as z from 'zod'

export const listSchema = z.object({
	name: z.string().max(20)
})
