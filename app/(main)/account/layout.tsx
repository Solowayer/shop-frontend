import AccountExit from '@/components/account/AccountExit'
import axios from 'axios'
import { cookies } from 'next/headers'
import Link from 'next/link'
import React from 'react'

export default async function Layout({ children }: { children: React.ReactNode }) {
	const cookieStore = cookies()
	const sessionId = cookieStore.get('connect.sid')

	console.log(sessionId)

	return (
		<div className="flex flex-col gap-6">
			{sessionId && (
				<div className="w-full flex justify-between">
					<h1 className="w-full text-3xl font-bold">Мій аккаунт</h1>
					<AccountExit />
				</div>
			)}
			{children}
			{!sessionId && (
				<div className="flex gap-2 items-center justify-center mt-6 p-6 rounded border-y">
					<span className="text-sm">Ще не з нами?</span>
					<Link className="text-sm text-blue-500 hover:underline" href="/auth/signin">
						Увійти
					</Link>
				</div>
			)}
		</div>
	)
}
