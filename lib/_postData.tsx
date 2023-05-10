export default async function postData(url: string, data: any) {
	const res = await fetch(url, { method: 'POST' })

	if (!res.ok) throw new Error('Failed to post cringe')

	return res.json()
}
