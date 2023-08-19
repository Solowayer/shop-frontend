import * as z from 'zod'
import { ZodType } from 'zod'

export const createProductSchema: ZodType<CreateProduct> = z.object({
	slug: z.string().min(1, { message: 'Вкажіть slug' }),
	name: z.string().min(1, { message: 'Вкажіть назву товару' }),
	description: z
		.string()
		.nullable()
		.transform(description => {
			if (description === '') return null
			return description
		}),
	tags: z.array(z.string()),
	categoryId: z.number().min(1, { message: 'Вкажіть категорію' })
})

// export const editProductSchema: ZodType<EditProduct> = z.object({
// 	slug: z.string().min(1, { message: 'Вкажіть slug' }).optional(),
// 	name: z.string().min(1, { message: 'Вкажіть назву товару' }).optional(),
// 	images: z.array(z.string()).max(10, { message: 'Максимум 10 фото' }).optional(),
// 	description: z
// 		.string()
// 		.optional()
// 		.nullable()
// 		.transform(description => {
// 			if (description === '') return null
// 			return description
// 		}),
// 	price: z.number().min(1, { message: 'Вкажіть ціну' }).optional(),
// 	categoryId: z.number().min(1, { message: 'Вкажіть категорію' }).optional(),
// 	published: z.boolean().optional()
// })
