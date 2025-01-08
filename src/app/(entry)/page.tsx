import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

import { rubik } from '@/config/font'
import { marketingConfig } from '@/config/marketing'

import ClientCarousel from '@/components/client-carousel'
import ProjectCarousel from '@/components/project-carousel'
import ServiceTabs from '@/components/service-tabs'
import { Button } from '@/components/ui/button'
import Icons from '@/components/ui/icons'

export default async function IndexPage() {
	const { clients, services, projects, getInTouch } = marketingConfig

	return (
		<React.Fragment>
			<div className="w-full">
				<header className="relative flex h-96 w-full items-center justify-start before:absolute before:inset-y-0 before:z-10 before:block before:size-full before:bg-black/70 md:h-[512px]">
					<div className="absolute z-0 size-full">
						<Image
							src="/images/jumbotron_bg.webp"
							alt="Container storage site"
							quality={100}
							fill
							sizes="100vw"
							priority
							className="bg-no-repeat object-cover object-center"
						/>
					</div>
					<div className="z-20 mx-auto flex size-full max-w-6xl flex-col items-center justify-center px-4 py-7 text-background sm:px-6 md:items-start lg:px-8">
						<h1 className={`${rubik.className} text-4xl font-bold sm:text-5xl md:text-7xl`}>We Bring Solutions!</h1>
						<Button asChild>
							<Link href="/tracking" className="mt-8">
								<Icons.mapPin className="mr-2 size-4" aria-hidden="true" />
								Track shipment
							</Link>
						</Button>
					</div>
				</header>
				<aside className="bg-primary text-background">
					<div className="mx-auto flex max-w-6xl flex-col items-center justify-between space-y-0 divide-y divide-red-700/90 px-4 py-10 sm:px-6 2md:flex-row 2md:space-y-0 2md:divide-y-0 lg:px-8 lg:py-14">
						{marketingConfig.overviews.map((overview) => {
							const Icon = Icons[overview.icon as keyof typeof Icons]

							return (
								<div
									key={`overview-${overview.icon}`}
									className="flex flex-col items-center space-x-0 space-y-2 pb-6 2md:items-start 2md:py-0 lg:flex-row lg:space-x-4 lg:space-y-0"
								>
									<Icon className="size-7 2md:size-9" />
									<div className="space-y-2 text-center 2md:text-left">
										<p className="font-light">{overview.title}</p>
										{overview.asLink ? (
											<a
												href={`${overview.linkType}:${overview.text}`}
												className="block rounded text-base font-medium hover:underline hover:decoration-2 hover:underline-offset-4 focus:outline-dashed focus:outline-2 focus:outline-offset-4 focus:outline-background 2md:text-lg"
											>
												{overview.text}
											</a>
										) : (
											<span className="block text-base font-medium 2md:text-lg">{overview.text}</span>
										)}
									</div>
								</div>
							)
						})}
					</div>
				</aside>
			</div>
			<section id="service" className="w-full bg-slate-200/30">
				<div className="mx-auto flex max-w-6xl flex-col items-center px-4 py-8 sm:px-6 lg:px-8">
					<div className="text-center">
						<h1
							className={`${rubik.className} text-xl font-extrabold text-secondary-foreground sm:text-2xl md:text-3xl`}
						>
							<span className="text-primary">Services</span> we offer
						</h1>
						<p className="mt-2 text-base text-slate-700 md:text-lg">We provide the best services for our customers.</p>
					</div>
					<ServiceTabs services={services} />
				</div>
			</section>
			<section id="client" className="w-full bg-background">
				<div className="mx-auto flex max-w-6xl flex-col items-center px-4 py-8 sm:px-6 lg:px-8">
					<div className="text-center">
						<h1
							className={`${rubik.className} text-xl font-extrabold text-secondary-foreground sm:text-2xl md:text-3xl`}
						>
							Our <span className="text-primary">clients</span>
						</h1>
						<p className="mt-2 text-base text-slate-700 md:text-lg">
							We did a great job with these companies. You can be the next to work with us!
						</p>
					</div>
					<ClientCarousel clients={clients} />
				</div>
			</section>
			<section id="project" className="w-full bg-muted/30 px-10">
				<div className="mx-auto flex max-w-6xl flex-col items-center px-4 py-8 sm:px-6 lg:px-8">
					<div className="text-center">
						<h1 className={`${rubik.className} text-xl font-extrabold sm:text-2xl md:text-3xl`}>
							Our success <span className="text-primary">stories</span>
						</h1>
						<p className="mt-2 text-base md:text-lg">
							Check out some of our featured projects we have done and currently working on.
						</p>
					</div>
					<ProjectCarousel projects={projects} />
				</div>
			</section>
			<section id="get-in-touch">
				<div className="mx-auto flex max-w-6xl flex-col items-center px-4 py-7 sm:px-6 lg:px-8">
					<div className="prose prose-sm w-full max-w-none sm:prose-base">
						<div className="grid grid-cols-6 gap-6">
							{getInTouch.map((item) => {
								const Icon = Icons[item.icon as keyof typeof Icons]

								return (
									<div key={item.id} className="col-span-6 rounded bg-muted p-4 lg:col-span-2">
										<Icon className="size-7 text-secondary-foreground" />
										<h3>{item.siteName}</h3>
										<p>{item.address}</p>
										<div className="flex">
											<span>Phone:</span>
											<a href={`tel:${item.phone}`} className="ml-2 block">
												{item.phone}
											</a>
										</div>
									</div>
								)
							})}
						</div>
					</div>
				</div>
			</section>
		</React.Fragment>
	)
}
