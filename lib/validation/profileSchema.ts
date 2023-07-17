import * as z from 'zod'

export const profileSchema = z.object({
	firstName: z.string().max(20),
	lastName: z.string().max(20),
	gender: z.string().transform(gender => {
		if (gender === '') return null
		return gender
	})
})
