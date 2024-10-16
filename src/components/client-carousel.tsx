'use client'

import React from 'react'
import Image from 'next/image'

import Autoplay from 'embla-carousel-autoplay'

import { chunk } from '@/lib/utils'

import { Carousel, CarouselContent, CarouselItem } from './ui/carousel'

type ClientCarouselProps = {
	clients: {
		id: string
		name: string
		logo: string
	}[]
}

const ClientCarousel = ({ clients }: ClientCarouselProps) => {
	const clientsChunked = chunk(clients, 2)

	return (
		<div className="mt-6 w-full select-none md:mt-10">
			<div className="hidden 2md:grid 2md:grid-cols-12 2md:gap-x-4 2md:gap-y-7">
				{clients.map((client) => (
					<div
						key={`${client.id}-on-desktop`}
						className="group relative col-span-3 flex items-center justify-center rounded border border-slate-300/70 py-2 shadow-sm"
					>
						<Image
							src={client.logo}
							className="mx-auto inline h-[60px] w-[80%] bg-center object-center"
							alt={`${client.id} logo`}
							height="0"
							width="0"
						/>
					</div>
				))}
			</div>
			<div className="block 2md:hidden">
				<Carousel
					opts={{ loop: true, duration: 30000, dragFree: false, watchDrag: false }}
					plugins={[Autoplay({ delay: 0 })]}
				>
					<CarouselContent>
						{clientsChunked.map((clients, index) => (
							<CarouselItem key={`swiper-slide-${index}`} className="basis-1/3 space-y-7">
								{clients.map((client) => (
									<div
										key={`${client.id}-on-mobile`}
										className="group relative flex items-center justify-center rounded border border-slate-300/70 py-2 shadow-sm"
									>
										<Image
											src={client.logo}
											className="mx-auto inline h-[60px] w-[80%] bg-center object-center"
											alt={`${client.name} logo`}
											width="0"
											height="0"
										/>
									</div>
								))}
							</CarouselItem>
						))}
					</CarouselContent>
				</Carousel>
			</div>
		</div>
	)
}

export default ClientCarousel
