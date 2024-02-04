export type OAuthStrategy = 'google' | 'discord'

export type NavItem = {
	title: string
	href?: string
	disabled?: boolean
}

export interface NavItemWithChildren extends NavItem {
	items: NavItemWithChildren[]
}

export interface NavItemWithOptionalChildren extends NavItem {
	items?: NavItemWithChildren[]
}

export type MainNavItem = NavItemWithOptionalChildren

export type ServiceItem = {
	id: text
	title: string
	description: string
	images: string
	benefits: { text: string }[]
}
