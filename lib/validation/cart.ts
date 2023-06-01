import * as z from 'zod'

export const addToCartSchema = z.object({
	quantity: z
		.string()
		.min(0)
		.transform(val => parseInt(val, 10)),
	productId: z.number()
})
