'use client'

import React from 'react'
import Button from '@/ui/Button'
import axios from 'axios'

import { useRouter } from 'next/navigation'

export default function AccountExit() {
	const router = useRouter()

	const handleLogout = async () => {
		try {
			const res = await axios.post(`${process.env.api}/user-auth/logout`, {}, { withCredentials: true })
			router.push('/')
			router.refresh()
			return res
		} catch (error) {
			throw new Error('Failed to fetch')
		}
	}

	return (
		<div>
			<Button variant="secondary" onClick={handleLogout}>
				Вийти
			</Button>
		</div>
	)
}
