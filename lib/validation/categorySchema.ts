import { ZodType, z } from 'zod'

export const createCategorySchema: ZodType<CreateCategory> = z.object({
	slug: z.string().min(1, { message: 'Вкажіть slug' }),
	name: z.string().min(1, { message: 'Вкажіть назву категорії' }),

	parentId: z.number().max(1).optional(),
	childrenIds: z.array(z.number()).optional()
})

export const updateCategorySchema: ZodType<UpdateCategory> = z.object({
	slug: z.string().min(1, { message: 'Вкажіть slug' }).optional(),
	name: z.string().min(1, { message: 'Вкажіть назву категорії' }).optional(),

	parentId: z.number().max(1).optional(),
	childrenIds: z.array(z.number()).optional()
})
