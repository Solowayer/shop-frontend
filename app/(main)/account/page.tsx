'use client'

import { useRouter } from 'next/navigation'

import { Button } from '@/ui/Button'
import Link from 'next/link'
import React from 'react'
import AccountCard from '@/components/AccountCard'

const accountCards = [
	{ href: '/profile', title: 'Мій профіль', subtitle: 'Моя особиста інформація' },
	{ href: '/orders', title: 'Мої замовлення', subtitle: 'Відслідковувати замовлення' },
	{ href: '/reviews', title: 'Мої відгуки', subtitle: 'Список ваших відгуків до товарів' }
]

export default function Account() {
	const token = null
	const router = useRouter()

	function clearStorage() {
		router.push('/')
		router.refresh()
	}

	return (
		<div className="flex flex-col gap-6">
			<h1 className="text-3xl font-bold">Мій аккаунт</h1>
			<div className="grid grid-cols-3 gap-4">
				{accountCards.map((card, index) => (
					<AccountCard key={index} href={card.href} title={card.title} subtitle={card.subtitle} />
				))}
			</div>
			{token && (
				<div className="flex w-full justify-center mt-6">
					<Button variant="secondary" onClick={() => clearStorage()}>
						Вийти
					</Button>
				</div>
			)}
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
