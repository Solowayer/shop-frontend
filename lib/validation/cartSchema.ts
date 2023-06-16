import * as z from 'zod'

export const addToCartSchema = z.object({
	quantity: z.number().min(1),
	productId: z.number()
})
