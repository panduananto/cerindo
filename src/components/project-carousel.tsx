'use client'

import React from 'react'
import Image from 'next/image'

import { rubik } from '@/config/font'
import { cn } from '@/lib/utils'

import { AspectRatio } from './ui/aspect-ratio'
import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel'
import Icons from './ui/icons'

type ProjectCarouselProps = {
	projects: {
		id: string
		title: string
		totalShipment: number
		description: string
		backgroundImage: string
		images: { src: string }[]
	}[]
}

const ProjectCarousel = ({ projects }: ProjectCarouselProps) => {
	return (
		<div className="mt-6 w-full rounded text-right md:mt-10">
			<Carousel opts={{ align: 'center' }}>
				<CarouselContent>
					{projects.map((project, index) => {
						return (
							<CarouselItem key={project.id} className={cn('relative min-[1015px]:basis-5/12')}>
								<Card className="h-full">
									<div>
										<AspectRatio ratio={16 / 9}>
											<Image src={project.images.at(0)!.src} alt="" fill className="rounded-t-lg object-cover" />
										</AspectRatio>
										<CardHeader>
											<CardTitle className={`${rubik.className} truncate text-left font-bold`}>
												{project.title}
											</CardTitle>
											<div className="mt-2 flex items-center space-x-1">
												<Icons.truck className="size-5 text-primary" />
												<p className="text-sm font-medium text-muted-foreground">
													<span className="font-bold text-primary">
														{Intl.NumberFormat('en-US', {
															notation: 'compact',
															maximumFractionDigits: 1,
														}).format(project.totalShipment)}
													</span>{' '}
													shipment succesfully processed
												</p>
											</div>
										</CardHeader>
									</div>
									<CardContent>
										<p className="pt-1.5 text-left text-sm leading-7 sm:text-sm sm:leading-7">{project.description}</p>
									</CardContent>
								</Card>
							</CarouselItem>
						)
					})}
				</CarouselContent>
				<CarouselPrevious />
				<CarouselNext />
			</Carousel>
		</div>
	)
}

export default ProjectCarousel
