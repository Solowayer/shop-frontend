'use client'

import React from 'react'
import Button from '@/ui/Button'
import axios from 'axios'

import { useRouter } from 'next/navigation'

export default function AccountExit() {
	const router = useRouter()

	const handleSignout = async () => {
		try {
			const res = await axios.get(`${process.env.api}/user-auth/signout`)
			router.push('/')
			router.refresh()
			return res
		} catch (error) {
			throw new Error('Failed to fetch')
		}
	}

	return (
		<div className="flex w-full justify-center mt-6">
			<Button variant="secondary" onClick={handleSignout}>
				Вийти
			</Button>
		</div>
	)
}
