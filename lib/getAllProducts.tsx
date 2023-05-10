export default async function getAllProducts() {
	const res = await fetch(`http://localhost:4200/products`, { next: { revalidate: 5 } })

	if (!res.ok) throw new Error('Failed to fetch')

	return (await res.json()) as Product[]
}
