'use client'

import React from 'react'

import { AnimatePresence, motion, MotionConfig } from 'framer-motion'

import { cn } from '@/lib/utils'

import UserAccountNav from '../user-account-nav'
import { SidebarNavButtonToggler, useSidebarNav } from './sidebar-nav'

import type { User } from '@supabase/supabase-js'

type DashboardMainAreaProps = {
	children: React.ReactNode
	user: User | null
}

const DashboardMainArea = ({ children, user }: DashboardMainAreaProps) => {
	const { open, setOpen, mode } = useSidebarNav()

	return (
		<MotionConfig transition={{ bounce: 0, duration: 0.3 }}>
			<AnimatePresence>
				{open && mode === 'over' && (
					<motion.div
						className="absolute z-40 block size-full bg-black/70"
						variants={{
							closed: {
								opacity: 0,
							},
							open: {
								opacity: 1,
							},
						}}
						initial="closed"
						animate="open"
						exit="closed"
						onClick={() => setOpen(false)}
					/>
				)}
			</AnimatePresence>
			<motion.main
				className={cn(
					'absolute right-0 flex min-h-full w-[calc(100%-280px)] flex-col transition-[width] delay-0 duration-300 ease-in-out',
					open ? 'w-full md:w-[calc(100%-280px)]' : 'w-full',
				)}
			>
				<header className="sticky inset-x-0 top-0 z-30 w-full border-b border-slate-300 bg-white shadow-sm">
					<div className="relative mx-auto flex h-16 max-w-full items-center justify-between px-4 sm:px-6 lg:px-8">
						<SidebarNavButtonToggler />
						<UserAccountNav user={user} />
					</div>
				</header>
				{children}
			</motion.main>
		</MotionConfig>
	)
}

export default DashboardMainArea
