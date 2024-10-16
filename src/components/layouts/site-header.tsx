'use client'

import React from 'react'
import Link from 'next/link'

import { motion, useMotionTemplate, useTransform } from 'framer-motion'

import { siteConfig } from '@/config/site'

import useBoundedScroll from '@/hooks/use-bounded-scroll'

import { Button } from '../ui/button'
import UserAccountNav from '../user-account-nav'
import MainNav from './main-nav'
import MobileNav from './mobile-nav'

import type { User } from '@supabase/supabase-js'

type SiteHeaderProps = {
	user: User | null
}

const SiteHeader = ({ user }: SiteHeaderProps) => {
	const { scrollYBoundedProgress } = useBoundedScroll(400)
	const scrollYBoundedProgressDelayed = useTransform(scrollYBoundedProgress, [0, 0.85, 1], [0, 0, 1])

	return (
		<header className="sticky inset-x-0 top-0 z-40 w-full border-b border-secondary-foreground/10 bg-background shadow-md">
			<div className="relative mx-auto flex h-16 max-w-6xl items-center px-4 sm:px-6 lg:px-8">
				<div className="flex items-center">
					<MainNav items={siteConfig.mainNav} />
					<MobileNav mainNavItems={siteConfig.mainNav} />
				</div>
				{/* <div className="ml-auto">
					{user ? (
						<UserAccountNav user={user} />
					) : (
						<Button>
							<Link href="/signin">
								Sign in
								<span className="sr-only">Sign in</span>
							</Link>
						</Button>
					)}
				</div> */}
			</div>
		</header>
	)
}

export default SiteHeader
