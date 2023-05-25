'use client'

import React from 'react'
import Button from '@/ui/Button'
import { useAuthCheckQuery, useAuthLogoutMutation } from '@/redux/api/authLoginApi'

import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { login, logout } from '@/redux/slices/authSlice'
import { RootState } from '@/redux/store'

export default function AccountExit() {
	const { data } = useAuthCheckQuery('')
	const [authLogout, { isError, isLoading, isSuccess }] = useAuthLogoutMutation()
	const dispatch = useAppDispatch()

	if (data) {
		dispatch(login())
	}

	const handleLogout = async () => {
		try {
			const payload = await authLogout().unwrap()
			console.log('fulfilled', payload)
			dispatch(logout())
			return payload
		} catch (error) {
			console.error('rejected', error)
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
