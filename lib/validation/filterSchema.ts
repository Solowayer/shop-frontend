import * as z from 'zod'

export const filterSchema = z.object({
	minPrice: z.number().min(1).optional(),
	maxPrice: z.number().min(1).optional()
})
