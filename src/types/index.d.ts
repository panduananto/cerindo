import Icons from '@/components/ui/icons'

import type { Tables } from './supabase'

export type OAuthStrategy = 'google' | 'discord'

export type NavItem = {
	title: string
	href?: string
	disabled?: boolean
	icon?: keyof typeof Icons
}

export interface NavItemWithChildren extends NavItem {
	items: NavItemWithChildren[]
}

export interface NavItemWithOptionalChildren extends NavItem {
	items?: NavItemWithChildren[]
}

export type MainNavItem = NavItemWithOptionalChildren

export type SidebarNavItem = NavItemWithChildren

export type ServiceItem = {
	id: text
	title: string
	description: string
	images: string
	benefits: { text: string }[]
}

export type Akl = {
	id: string
	type: string | null
	name: string | null
	facility: string | null
	brand_name: string | null
	created_at: string
	date: string | null
	expiry_date: string | null
	file_url: string | null
	id_akl: string
	packaging: string | null
	countries: {
		code: string | null
		name: string | null
	}
	hscode: {
		code: string
		import_dutyfees: number | null
		income_tax_api: number | null
		income_tax_non_api: number | null
		lartas: string | null
		value_added_tax: number | null
	}
}

export type SearchAklQuery = Pick<Tables<'akl_items'>, 'id' | 'type' | 'name' | 'facility'> &
	{
		akl: Pick<Tables<'akl'>, 'brand_name' | 'created_at' | 'date' | 'expiry_date' | 'file_url' | 'id' | 'packaging'>
		countries: Pick<Tables<'countries'>, 'code' | 'name'>
		hscode: Pick<
			Tables<'hscode'>,
			'code' | 'import_dutyfees' | 'income_tax_api' | 'income_tax_non_api' | 'lartas' | 'value_added_tax'
		>
	}[]

export type SearchAklResult = Akl[]
