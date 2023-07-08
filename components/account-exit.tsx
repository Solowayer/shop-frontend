'use client'

import React from 'react'
import { Button } from '@/components/ui'

import { useRouter } from 'next/navigation'

import { useMutation } from '@tanstack/react-query'
import AuthService from '@/services/auth.service'
import { useUserStore } from '@/store/userStore'

export default function AccountExit() {
	const { setIsAuth, setIsSeller, setCartTotalQty } = useUserStore()

	const mutation = useMutation({
		mutationFn: AuthService.logout,
		onSuccess: () => {
			setIsAuth(false)
			setIsSeller(false)
			setCartTotalQty(0)
		}
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
