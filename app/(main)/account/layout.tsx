import AccountExit from '@/components/account/AccountExit'
import { cookies } from 'next/headers'
import Link from 'next/link'
import React from 'react'

export default function Layout({ children }: { children: React.ReactNode }) {
	const cookieStore = cookies()
	const token = cookieStore.get('token')
	console.log(token)

	return (
		<div className="flex flex-col gap-6">
			{children}
			{token && <AccountExit />}
			{!token && (
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
