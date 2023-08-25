interface Category {
	id: number
	slug: string
	name: string
	parentId?: number
	parent?: Category
	children?: Category[]
}

interface CreateCategory {
	slug: string
	name: string
	parentId?: number | null
	childrenIds?: number[]
}

interface FullCategory extends Category {
	children: Category[]
	products: Product[]
}

interface UpdateCategory extends Partial<CreateCategory> {}

interface CategoryFilters {
	q?: string
}
