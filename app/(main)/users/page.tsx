import { ButtonLink } from '@/ui/ButtonLink'

import axios from 'axios'

export default async function Users() {
	try {
		const response = await axios.get(`${process.env.api}/users`, {
			withCredentials: true,
			params: { next: 'revalidate=5' }
		})
		const users = response.data as User[]
		console.log(users)

		return (
			<div>
				{users.map((user, index) => (
					<span key={index} className="flex flex-col gap-2">
						{user.username}
					</span>
				))}
			</div>
		)
	} catch (error) {
		console.log((error as { response: { data: any } }).response.data)
		return <ButtonLink href="/auth/login">Увійти</ButtonLink>
	}
}
