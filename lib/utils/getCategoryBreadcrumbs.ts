import { fetchCategoryById } from '../queries'

export async function getCategoryBreadcrumbs(category: Category, breadcrumbs: Category[] = []): Promise<Category[]> {
	breadcrumbs.unshift(category)

	if (category.parentId) {
		const parentCategory = await fetchCategoryById(category.parentId)
		return getCategoryBreadcrumbs(parentCategory, breadcrumbs)
	}

	return breadcrumbs
}
