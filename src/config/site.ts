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
					title: 'client',
					href: '#client',
					items: [],
				},
				{
					title: 'service',
					href: '#service',
					items: [],
				},
				{
					title: 'project',
					href: '#project',
					items: [],
				},
				{
					title: 'get in touch',
					href: '#get-in-touch',
					items: [],
				},
				{
					title: 'about us',
					href: '/about-us',
					items: [],
				},
				{
					title: 'FAQ',
					href: '/faq',
					items: [],
				},
			],
		},
	] satisfies MainNavItem[],
}

export type SiteConfig = typeof siteConfig
