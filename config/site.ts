const Routes = {
	ACCOUNT: '/account'
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
			href: '/seller/dashboard'
		}
	],
	profile: []
}
