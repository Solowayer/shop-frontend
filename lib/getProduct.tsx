export default async function getProduct(slug: string) {
	const res = await fetch(`http://localhost:4200/products/${slug}`)

	if (!res.ok) throw new Error('Failed to fetch')

	return res.json()
}
