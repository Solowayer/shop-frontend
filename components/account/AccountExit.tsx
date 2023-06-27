'use client'

import React from 'react'
import { Button } from '@/ui'

import { useRouter } from 'next/navigation'

import { useMutation } from '@tanstack/react-query'
import { logout } from '@/lib/mutations'
import { useAuthStore } from '@/store/authStore'

export default function AccountExit() {
	const { setIsAuth } = useAuthStore()

	const mutation = useMutation({
		mutationFn: logout,
		onSuccess: () => setIsAuth(false)
	})

	const router = useRouter()

	const handleLogout = async () => {
		try {
			mutation.mutate()
			router.push('/')
		} catch (error) {
			console.log(error)
		}
	}

	return (
		<div>
			<Button intent="secondary" onClick={handleLogout}>
				Вийти
			</Button>
		</div>
	)
}
