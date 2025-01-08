'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

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
		slug: string
		totalShipment: number
		description: string
		backgroundImage: string
		images: { src: string }[]
	}[]
}

const ProjectCarousel = ({ projects }: ProjectCarouselProps) => {
	return (
		<div className="mt-6 w-full rounded-lg text-right md:mt-10">
			<Carousel opts={{ align: 'center' }} className="rounded-lg">
				<CarouselContent className="rounded-lg">
					{projects.map((project, index) => {
						return (
							<CarouselItem
								key={project.id}
								className={cn('relative rounded-lg transition-transform hover:scale-105 min-[1015px]:basis-5/12')}
							>
								<Link href={`/blog/${project.slug.toLowerCase()}`} className="rounded-lg">
									<Card className="h-full">
										<div className="rounded-lg">
											<AspectRatio ratio={16 / 9}>
												<Image src={project.images.at(0)!.src} alt="" fill className="rounded-t-lg object-cover" />
											</AspectRatio>
											<CardHeader>
												<CardTitle className={`${rubik.className} truncate text-left font-bold`}>
													{project.title}
												</CardTitle>
												{/* <div className="mt-2 flex items-center space-x-1">
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
												</div> */}
											</CardHeader>
										</div>
										<CardContent>
											<p className="pt-1.5 text-left text-sm leading-7 sm:text-sm sm:leading-7">
												{project.description}
											</p>
										</CardContent>
									</Card>
								</Link>
							</CarouselItem>
						)
					})}
				</CarouselContent>
				<CarouselPrevious />
				<CarouselNext />
			</Carousel>
			<Link
				href="/blog"
				className="mt-8 inline-block hover:underline hover:decoration-red-500 hover:underline-offset-2"
			>
				See more
			</Link>
		</div>
	)
}

export default ProjectCarousel
