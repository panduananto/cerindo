'use client'

import React from 'react'

import { cn } from '@/lib/utils'

import useHash from '@/hooks/use-hash'

import Logo from '../logo'

import type { MainNavItem } from '@/types'

type MainNavProps = {
	items?: MainNavItem[]
}

const MainNav = ({ items }: MainNavProps) => {
	const hash = useHash()

	return (
		<div className="hidden gap-10 2md:flex">
			<Logo />
			{items?.[0]?.items ? (
				<nav
					aria-label="Main"
					className="flex items-center text-sm font-semibold leading-6 text-secondary-foreground first-letter:uppercase"
				>
					<ul className="flex space-x-8">
						{items[0].items.map((item) => (
							<li key={`menu-item-${item.title}`}>
								<a
									href={item.href}
									className={cn(
										'block transition-colors duration-150 ease-in-out first-letter:uppercase hover:text-primary',
										item.href?.includes(String(hash)) && String(hash) !== '' && 'text-primary',
									)}
								>
									{item.title}
								</a>
							</li>
						))}
					</ul>
				</nav>
			) : null}
		</div>
	)
}

export default MainNav
