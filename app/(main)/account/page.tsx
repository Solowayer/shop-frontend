import AccountCard from '@/components/account/AccountCard'

const accountCards = [
	{ href: '/profile', title: 'Мій профіль', subtitle: 'Моя особиста інформація' },
	{ href: '/orders', title: 'Мої замовлення', subtitle: 'Відслідковувати замовлення' },
	{ href: '/reviews', title: 'Мої відгуки', subtitle: 'Список ваших відгуків до товарів' }
]

export default function Account() {
	return (
		<>
			<div className="grid grid-cols-3 gap-4">
				{accountCards.map((card, index) => (
					<AccountCard key={index} href={card.href} title={card.title} subtitle={card.subtitle} />
				))}
			</div>
		</>
	)
}
