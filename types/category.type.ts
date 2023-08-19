interface Category {
	id: number
	slug: string
	name: string
	isMain: boolean
	parentId: number
	parent: Category
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

interface CategoryFilters {
	q?: string
}
