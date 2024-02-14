import type { SidebarNavItem } from '@/types'

export type DashboardConfig = {
	sidebarNav: SidebarNavItem[]
}

export const dashboardConfig: DashboardConfig = {
	sidebarNav: [
		{
			title: 'Dashboard',
			href: '/dashboard',
			icon: 'dashboard',
			items: [],
		},
		{
			title: 'Master Data',
			icon: 'database',
			items: [
				{
					title: 'Shipper',
					href: '/dashboard/master-data/shipper',
					items: [],
				},
				{
					title: 'Consignee',
					href: '/dashboard/master-data/consignee',
					items: [],
				},
				{
					title: 'Alat Kesehatan Luar Negeri',
					href: '/dashboard/master-data/akl',
					items: [],
				},
			],
		},
		{
			title: 'Pencarian AKL',
			href: '/dashboard/search-akl',
			icon: 'heartPulse',
			items: [],
		},
		{
			title: 'Surat Keputusan Pabean',
			href: '/dashboard/skpabean',
			icon: 'bookCheck',
			items: [],
		},
	],
}
