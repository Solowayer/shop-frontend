import * as z from 'zod'
import { ZodType } from 'zod'

export const createProductSchema: ZodType<CreateProduct> = z.object({
	slug: z.string().min(1, { message: 'Вкажіть slug' }),
	name: z.string().min(1, { message: 'Вкажіть назву товару' }),
	description: z.string().optional(),
	price: z.number(),
	categoryId: z.number().min(1, { message: 'Вкажіть категорію' }),
	published: z.boolean()
})
