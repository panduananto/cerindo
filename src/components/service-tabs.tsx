'use client'

import React, { useState } from 'react'

import { ServiceItem } from '@/types'

import { rubik } from '@/config/font'
import { marketingConfig } from '@/config/marketing'
import { cn } from '@/lib/utils'

import Icons from './ui/icons'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'

type ServiceTabsProps = {
	services: {
		[key in keyof typeof marketingConfig.services]: {
			id: string
			title: string
			description: string
			images: string
			benefits: {
				text: string
			}[]
		}[]
	}
}

const ServiceTabs = ({ services }: ServiceTabsProps) => {
	const tabKeys = Object.keys(services) as Array<keyof typeof services>

	return (
		<Tabs defaultValue={tabKeys[0]} orientation="vertical">
			<div className="mt-6 grid w-full grid-cols-12 gap-4 md:mt-10">
				<div className="col-span-12 touch-pan-x select-none self-start overflow-x-auto bg-background px-2 pb-6 pt-2 transition-colors duration-150 ease-in-out scrollbar scrollbar-track-background scrollbar-thumb-slate-300 hover:scrollbar-thumb-slate-400 xl:col-span-3 xl:touch-none xl:overflow-visible xl:bg-transparent xl:p-0">
					<TabsList className="float-left flex h-auto min-w-full space-x-2 space-y-0 bg-transparent p-0 xl:float-none xl:block xl:space-x-0 xl:space-y-2">
						{tabKeys.map((key) => {
							return (
								<TabsTrigger
									key={key}
									value={key}
									className={cn(
										'backgroundspace-nowrap w-full justify-start rounded px-5 py-2.5 text-left text-sm font-semibold leading-5 xl:px-5 xl:py-4',
										'duration-150 ease-in-out focus:outline-none focus:ring-4 focus:ring-red-300',
										'data-[state=active]:bg-primary data-[state=active]:text-background data-[state=active]:shadow-sm',
									)}
								>
									{key}
								</TabsTrigger>
							)
						})}
					</TabsList>
				</div>
				<div className="col-span-12 pt-0 xl:col-span-9">
					{tabKeys.map((key, index) => {
						return (
							<TabsContent key={`${key}-post-item-${index}`} value={key} className="mt-0">
								{(services[key] as ServiceItem[]).map((service) => {
									return (
										<div key={`post-${service.id}`} className="grid grid-cols-8 overflow-hidden rounded">
											<img
												src={service.images}
												className="col-span-8 size-auto max-h-full min-h-full min-w-full max-w-full bg-no-repeat object-cover object-center md:col-span-4 md:h-full"
												alt={`${service.id}`}
											/>
											<div className="col-span-8 rounded-b border-x border-b border-slate-300 bg-background p-4 text-sm text-secondary-foreground md:col-span-4 md:rounded-bl-none md:rounded-tr md:border-l-0 md:border-t md:px-6 md:py-8">
												<h3 className={`${rubik.className} text-lg font-bold md:text-xl`}>{service.title}</h3>
												<ReadMoreText text={service.description} />
												<ul className="mt-4 space-y-2 md:mt-6">
													{service.benefits.map((benefit) => (
														<li key={benefit.text} className="flex flex-row items-center space-x-3">
															<Icons.star className="size-4 shrink-0 fill-current text-primary md:size-5" />
															<p className="text-slate-600 md:text-base">{benefit.text}</p>
														</li>
													))}
												</ul>
											</div>
										</div>
									)
								})}
							</TabsContent>
						)
					})}
				</div>
			</div>
		</Tabs>
	)
}

type ReadMoreTextProps = {
	text: string
}

const ReadMoreText = ({ text }: ReadMoreTextProps) => {
	const [isOpen, setIsOpen] = useState<boolean>(false)

	return (
		<div>
			<p className="mt-2 !leading-7 md:mt-4 md:text-base">{isOpen ? text : `${text.substring(0, 80)}...`}</p>
			<button onClick={() => setIsOpen(!isOpen)} className="font-semibold text-primary">
				{isOpen ? 'show less' : 'read more'}
			</button>
		</div>
	)
}

export default ServiceTabs
