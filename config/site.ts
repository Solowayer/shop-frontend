import { Routes } from './routes'

// type Dropdown = {
// 	title: string
// 	href: string
// }

// типізація
export const siteConfig = {
	userHeaderMenu: [
		{
			title: 'Мій аккаунт',
			href: Routes.ACCOUNT
		},
		{
			title: 'Обране',
			href: `${Routes.ACCOUNT}/wishlists`
		},
		{
			title: 'Дашборд продавця',
			href: `${Routes.SELLER}/dashboard`
		}
	],
	profile: []
}
