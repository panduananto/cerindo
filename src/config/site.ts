import type { MainNavItem } from '@/types'

export const siteConfig = {
	name: 'cerindo',
	description:
		'Streamline your global logistics with ease. Experience, efficient and transparent logistics solutions for your business.',
	url: 'https://c3rindo.vercel.app/',
	links: {
		github: 'https://github.com/panduananto/cerindo',
	},
	mainNav: [
		{
			title: 'Lobby',
			items: [
				{
					title: 'about us',
					href: '/about-us',
					items: [],
				},
				{
					title: 'services',
					href: '#services',
					items: [],
				},
				{
					title: 'clients',
					href: '#clients',
					items: [],
				},
				{
					title: 'projects',
					href: '#projects',
					items: [],
				},
				{
					title: 'FAQ',
					href: '/faq',
					items: [],
				},
				{
					title: 'get in touch',
					href: '#get-in-touch',
					items: [],
				},
			],
		},
	] satisfies MainNavItem[],
}

export type SiteConfig = typeof siteConfig
