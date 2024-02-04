'use client'

import React from 'react'
import Link from 'next/link'

import { motion, useMotionTemplate, useTransform } from 'framer-motion'

import { siteConfig } from '@/config/site'

import useBoundedScroll from '@/hooks/use-bounded-scroll'

import SignoutButton from '../auth/signout-button'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { Button } from '../ui/button'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '../ui/dropdown-menu'
import Icons from '../ui/icons'
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
		<motion.header
			style={{
				translateY: useMotionTemplate`calc(${useTransform(scrollYBoundedProgressDelayed, [0, 1], [0, -100])} * 1%)`,
			}}
			className="sticky inset-x-0 top-0 z-40 w-full border-b border-slate-900/10 bg-white"
		>
			<div className="relative mx-auto flex h-16 max-w-6xl items-center px-4 sm:px-6 lg:px-8">
				<div className="flex items-center">
					<MainNav items={siteConfig.mainNav} />
					<MobileNav mainNavItems={siteConfig.mainNav} />
				</div>
				<div className="ml-auto">
					{user ? (
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<Button variant="secondary" className="relative size-8 rounded-full">
									<Avatar>
										{user?.user_metadata.avatar_url ? (
											<AvatarImage src={user.user_metadata.avatar_url} alt={`${user.email} profile picture`} />
										) : (
											<AvatarFallback>
												<Icons.user className="size-5" />
												<span className="sr-only">{user.email}</span>
											</AvatarFallback>
										)}
									</Avatar>
								</Button>
							</DropdownMenuTrigger>
							<DropdownMenuContent className="w-56" align="end" forceMount>
								<DropdownMenuLabel className="font-normal">
									<div className="flex flex-col space-y-1">
										<p>Signed in as</p>
										<p className="mt-1.5 text-sm font-medium leading-none">{user.email}</p>
									</div>
								</DropdownMenuLabel>
								<DropdownMenuSeparator />
								<DropdownMenuGroup>
									<DropdownMenuItem asChild>
										<Link href="/dashboard">
											<Icons.dashboard className="mr-2 size-4" aria-hidden="true" />
											Dashboard
										</Link>
									</DropdownMenuItem>
								</DropdownMenuGroup>
								<DropdownMenuSeparator />
								<DropdownMenuGroup>
									<DropdownMenuItem asChild>
										<SignoutButton className="w-full" />
									</DropdownMenuItem>
								</DropdownMenuGroup>
							</DropdownMenuContent>
						</DropdownMenu>
					) : (
						<Button>
							<Link href="/signin">
								Sign in
								<span className="sr-only">Sign in</span>
							</Link>
						</Button>
					)}
				</div>
			</div>
		</motion.header>
	)
}

export default SiteHeader
