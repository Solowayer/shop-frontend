import { ZodType, z } from 'zod'

const attributeValuesSchema = z.object({
	attributeId: z.number().min(1, { message: 'Вкажіть ID атрибуту' }),
	value: z.string().min(1, { message: 'Вкажіть значення атрибуту' })
})

export const createVariantSchema: ZodType<CreateVariant> = z.object({
	productId: z.number().min(1, { message: 'Вкажіть id товара' }),
	images: z.array(z.string()).max(10, { message: 'Максимум 10 фото' }),
	price: z.number().min(1, { message: 'Вкажіть ціну' }),
	stock: z.number().min(1, { message: 'Вкажіть stock' }),
	attributeValues: z.array(attributeValuesSchema)
})
