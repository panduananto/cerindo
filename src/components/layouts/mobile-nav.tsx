'use client'

import React, { useState } from 'react'

import { AccordionHeader } from '@radix-ui/react-accordion'

import { cn } from '@/lib/utils'

import useHash from '@/hooks/use-hash'

import Logo from '../logo'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion'
import { Button } from '../ui/button'
import Icons from '../ui/icons'
import { ScrollArea } from '../ui/scroll-area'
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet'

import type { MainNavItem } from '@/types'

type MobileNavProps = {
	mainNavItems?: MainNavItem[]
}

const MobileNav = ({ mainNavItems }: MobileNavProps) => {
	const hash = useHash()
	const [isOpen, setIsOpen] = useState<boolean>(false)

	return (
		<Sheet open={isOpen} onOpenChange={setIsOpen}>
			<SheetTrigger asChild>
				<Button
					variant="ghost"
					className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 2md:hidden"
				>
					<Icons.hamburgerMenu className="size-6" />
					<span className="sr-only">Toggle menu</span>
				</Button>
			</SheetTrigger>
			<SheetContent side="left" className="pl-1 pr-0">
				<div className="px-7">
					<Logo onClick={() => setIsOpen(false)} />
				</div>
				<ScrollArea className="my-4 h-[calc(100vh-8rem)] pb-10 pl-6">
					<div className="pl-1 pr-7">
						<Accordion type="multiple" defaultValue={mainNavItems?.map((item) => item.title)} className="w-full">
							{mainNavItems?.map((item, index) => {
								return (
									<AccordionItem value={item.title} key={index}>
										<AccordionHeader className="flex">
											<AccordionTrigger className="text-sm capitalize">{item.title}</AccordionTrigger>
										</AccordionHeader>
										<AccordionContent>
											<div className="flex flex-col space-y-2">
												{item.items?.map((subItem, index) =>
													subItem.href ? (
														<a
															key={subItem.title}
															href={subItem.href}
															className={cn(
																'text-foreground/70 transition-colors hover:text-foreground',
																subItem.href.includes(String(hash)) && String(hash) !== '' && 'text-primary',
																subItem.disabled && 'pointer-events-none opacity-60',
															)}
															onClick={() => setIsOpen(false)}
														>
															{subItem.title}
														</a>
													) : (
														<div key={index} className="text-foreground/70 transition-colors">
															{item.title}
														</div>
													),
												)}
											</div>
										</AccordionContent>
									</AccordionItem>
								)
							})}
						</Accordion>
					</div>
				</ScrollArea>
			</SheetContent>
		</Sheet>
	)
}

export default MobileNav
