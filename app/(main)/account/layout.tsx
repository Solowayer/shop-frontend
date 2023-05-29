import AccountExit from '@/components/account/AccountExit'
import React from 'react'

export default async function Layout({ children }: { children: React.ReactNode }) {
	return (
		<div className="flex flex-col gap-6">
			<div className="w-full flex justify-between">
				<h1 className="w-full text-3xl font-bold">Мій аккаунт</h1>
				<AccountExit />
			</div>
			{children}
		</div>
	)
}
