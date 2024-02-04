'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { cn } from '@/lib/utils'

import Logo from '../logo'

import type { MainNavItem } from '@/types'

type MainNavProps = {
	items?: MainNavItem[]
}

const MainNav = ({ items }: MainNavProps) => {
	const pathname = usePathname()

	return (
		<div className="hidden gap-6 2md:flex">
			<Logo />
			{items?.[0]?.items ? (
				<nav
					aria-label="Main"
					className="flex items-center text-sm font-semibold leading-6 text-slate-900 first-letter:uppercase"
				>
					<ul className="flex space-x-8">
						{items[0].items.map((item) => (
							<li key={`menu-item-${item.title}`}>
								<Link
									href={`/${item.href}`}
									className={cn(
										'block transition-colors duration-150 ease-in-out first-letter:uppercase hover:text-red-600',
										pathname === item.href && 'text-red-600',
									)}
								>
									{item.title}
								</Link>
							</li>
						))}
					</ul>
				</nav>
			) : null}
		</div>
	)
}

export default MainNav
