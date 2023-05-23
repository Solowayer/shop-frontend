'use client'

import getAllUsers from '@/lib/getAllUsers'

export default async function Users() {
	const usersData: Promise<User[]> = getAllUsers()
	const users = await usersData

	return (
		<div>
			{users.map((user, index) => (
				<span key={index} className="flex flex-col gap-2">
					{user.username}
				</span>
			))}
		</div>
	)
}
