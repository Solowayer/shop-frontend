const Routes = {
	ACCOUNT: '/account',
	SELLER: '/seller'
}

export const siteConfig = {
	userHeaderMenu: [
		{
			title: 'Мій аккаунт',
			href: Routes.ACCOUNT
		},
		{
			title: 'Обране',
			href: `${Routes.ACCOUNT}/lists`
		},
		{
			title: 'Дашборд продавця',
			href: `${Routes.SELLER}/dashboard`
		}
	],
	profile: []
}
