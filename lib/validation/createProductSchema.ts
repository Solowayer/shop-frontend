import * as z from 'zod'

export const createProductSchema = z.object({
	slug: z.string().min(1, { message: 'Вкажіть slug' }).max(20),
	name: z.string().min(1, { message: 'Вкажіть назву товару' }).max(50),
	description: z.string().email(),
	price: z
		.string()
		.transform(value => parseFloat(value))
		.refine(value => !isNaN(value) && value >= 1, {
			message: 'Вкажіть ціну більшу або рівну 1'
		}),
	categoryId: z
		.string()
		.transform(value => parseFloat(value))
		.refine(value => !isNaN(value) && value >= 1, {
			message: 'Вкажіть категорію по id'
		}),
	published: z.boolean()
})
