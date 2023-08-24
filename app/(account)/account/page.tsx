import AccountCard from '@/components/account-card'

const accountCards = [
	{ href: '/account/profile', title: 'Профіль', subtitle: 'Моя особиста інформація' },
	{ href: '/account/orders', title: 'Замовлення', subtitle: 'Відслідковувати замовлення' },
	{ href: '/account/reviews', title: 'Відгуки', subtitle: 'Список ваших відгуків до товарів' },
	{ href: '/account/wishlists', title: 'Списки', subtitle: 'Ваші списки' },
	{ href: '/account/adresses', title: 'Адреси', subtitle: 'Додавайте адреси на які будуть приходити замовлення' }
]

export default function Account() {
	return (
		<div className="flex flex-col gap-6">
			<h1 className="w-full text-3xl font-bold">Мій аккаунт</h1>
			<div className="grid grid-cols-3 gap-4">
				{accountCards.map((card, index) => (
					<AccountCard key={index} href={card.href} title={card.title} subtitle={card.subtitle} />
				))}
			</div>
		</div>
	)
}
