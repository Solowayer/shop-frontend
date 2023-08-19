interface Variant {
	id: number
	images?: string[]
	price: number
	stock: number
}

interface CreateVariant {
	images?: string[]
	price: number
	stock: number
	productId: number
	attributeValues: { attributeId: number; value: string }[]
}
