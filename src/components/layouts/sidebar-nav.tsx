'use client'

import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { AccordionHeader } from '@radix-ui/react-accordion'
import { AnimatePresence, motion, MotionConfig } from 'framer-motion'
import { ChevronRight } from 'lucide-react'
import { useMediaQuery } from 'usehooks-ts'

import { cn } from '@/lib/utils'

import Logo from '../logo'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion'
import { Button } from '../ui/button'
import Icons from '../ui/icons'
import { ScrollArea } from '../ui/scroll-area'

import type { SidebarNavItem } from '@/types'

type SidebarNavMode = 'side' | 'over'

type SidebarNavProviderProps = {
	children: React.ReactNode
}

type SidebarNavContextType = {
	open: boolean
	setOpen: React.Dispatch<React.SetStateAction<boolean>>
	mode: SidebarNavMode
	setMode: React.Dispatch<React.SetStateAction<SidebarNavMode>>
}

export const SidebarNavContext = createContext<SidebarNavContextType>({} as SidebarNavContextType)

export const SidebarNavProvider = ({ children }: SidebarNavProviderProps) => {
	const [open, setOpen] = useState<boolean>(true)
	const [mode, setMode] = useState<SidebarNavMode>('side')

	const isSmall = useMediaQuery('(max-width: 768px)', { initializeWithValue: false })

	useEffect(() => {
		if (isSmall) {
			setMode('over')
			setOpen(false)
		} else {
			setMode('side')
			setOpen(true)
		}
	}, [isSmall])

	return (
		<SidebarNavContext.Provider
			value={{
				open,
				setOpen,
				mode,
				setMode,
			}}
		>
			{children}
		</SidebarNavContext.Provider>
	)
}

export const useSidebarNav = () => {
	const context = useContext(SidebarNavContext)

	if (context === undefined) {
		throw new Error('useSidebarNav must be used within <SidebarNavContext.Provider>')
	}

	return context
}

export const SidebarNavButtonToggler = () => {
	const { open, setOpen } = useSidebarNav()

	return (
		<Button variant="ghost" className="p-2" onClick={() => setOpen(!open)}>
			<Icons.hamburgerMenu className="size-6" />
			<span className="sr-only">Toggle sidebar</span>
		</Button>
	)
}

type SidebarNavProps = {
	items: SidebarNavItem[]
}

export const SidebarNav = ({ items }: SidebarNavProps) => {
	const { open } = useSidebarNav()
	const pathname = usePathname()

	if (!items.length) {
		return null
	}

	return (
		<MotionConfig transition={{ bounce: 0, duration: 0.2 }}>
			<motion.aside
				className={cn('sticky top-0 z-50 h-full border-r border-slate-300 bg-white')}
				variants={{
					closed: {
						x: '-100%',
					},
					open: {
						x: 0,
					},
				}}
				animate={open ? 'open' : 'closed'}
			>
				<div className="w-[280px] max-w-[280px]">
					<div className="flex h-16 items-center px-6 py-4 pb-0">
						<Logo />
					</div>
					<ScrollArea className="py-4">
						<Accordion type="single" collapsible={true} className="w-full">
							{items.map((item, index) => {
								const Icon = item.icon ? Icons[item.icon as keyof typeof Icons] : ChevronRight

								return (
									<AccordionItem value={item.title} key={index} className="border-b-0">
										{item.items.length !== 0 ? (
											<React.Fragment>
												<div className="mx-2 flex items-center px-4">
													<Icon className="mr-2 size-5" />
													<AccordionHeader className="flex flex-1">
														<AccordionTrigger className="py-2 text-sm capitalize">{item.title}</AccordionTrigger>
													</AccordionHeader>
												</div>
												<AccordionContent className="py-2">
													<div className="flex flex-col space-y-2">
														{item.items?.map((subItem, index) => {
															return subItem.href ? (
																<Link
																	key={subItem.title}
																	href={subItem.href}
																	className={cn(
																		'mx-2 px-4 text-foreground/70 transition-colors hover:text-foreground',
																		subItem.href === pathname && 'text-primary',
																		subItem.disabled && 'pointer-events-none opacity-60',
																	)}
																>
																	{subItem.title}
																</Link>
															) : (
																<div key={index} className="text-foreground/70 transition-colors">
																	{item.title}
																</div>
															)
														})}
													</div>
												</AccordionContent>
											</React.Fragment>
										) : item.href ? (
											<Link
												href={item.href}
												className={cn(
													'mx-2 flex items-center px-4 py-2 text-sm capitalize',
													item.href === pathname && 'text-primary',
												)}
											>
												<Icon className="mr-2 size-5" />
												{item.title}
											</Link>
										) : null}
									</AccordionItem>
								)
							})}
						</Accordion>
					</ScrollArea>
				</div>
			</motion.aside>
		</MotionConfig>
	)
}
