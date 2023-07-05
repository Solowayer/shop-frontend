interface Category {
	id: number
	name: string
	isMain: boolean
	parentId: number
}

interface CreateCategory {
	slug: string
	name: string
	parentId?: number
	childrenIds?: number[]
}

interface FullCategory extends Category {
	children: Category[]
	products: Product[]
}

interface EditCategory extends Partial<CreateCategory> {}
