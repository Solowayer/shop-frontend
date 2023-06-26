import * as z from 'zod'
import { ZodType } from 'zod'

export const createProductSchema: ZodType<CreateProduct> = z.object({
	slug: z.string().min(1, { message: 'Вкажіть slug' }),
	name: z.string().min(1, { message: 'Вкажіть назву товару' }),
	// images: z.array(z.string()).max(10, { message: 'Максимум 10 фото' }),
	description: z.string().optional(),
	price: z.number().min(1, { message: 'Вкажіть ціну' }),
	categoryId: z.number().min(1, { message: 'Вкажіть категорію' }),
	published: z.boolean()
})

export const editProductSchema: ZodType<EditProduct> = z.object({
	slug: z.string().min(1, { message: 'Вкажіть slug' }).optional(),
	name: z.string().min(1, { message: 'Вкажіть назву товару' }).optional(),
	// images: z.array(z.string()).max(10, { message: 'Максимум 10 фото' }).optional(),
	description: z.string().optional(),
	price: z.number().min(1, { message: 'Вкажіть ціну' }).optional(),
	categoryId: z.number().min(1, { message: 'Вкажіть категорію' }).optional(),
	published: z.boolean().optional()
})
