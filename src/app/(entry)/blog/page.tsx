import React from 'react'
import Link from 'next/link'

import { env } from '@/env'

import { rubik } from '@/config/font'

import type { Metadata } from 'next'

export const metadata: Metadata = {
	metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
	title: 'blog',
	description: 'We are Cerindo',
}

export default async function BlogIndexPage() {
	return (
		<div className="mx-auto flex w-full max-w-6xl flex-col px-4 py-8 sm:px-6 lg:px-8">
			<div className="py-8">
				<header>
					<h1
						className={`${rubik.className} text-4xl font-extrabold text-secondary-foreground sm:text-3xl md:text-5xl`}
					>
						(butuh title) Nam porttitor id dui sit amet
					</h1>
					<p className="mt-6 text-base text-slate-600 dark:text-slate-400">
						(butuh subtitle) Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis, asperiores.
					</p>
				</header>
				<div className="mt-16 sm:mt-20">
					<div className="md:border-l md:border-slate-400 md:pl-6 md:dark:border-slate-700/40">
						<div className="flex max-w-3xl flex-col space-y-16">
							<article className="md:grid md:grid-cols-4 md:items-baseline">
								<div className="group relative flex flex-col items-start md:col-span-3">
									<h2 className="text-base font-semibold tracking-tight text-zinc-800 dark:text-zinc-100">
										<Link href="/blog/telkomsel">Telkomsel</Link>
										<p className="relative z-10 mt-2 text-sm text-zinc-600 dark:text-zinc-400">
											We're the official house forwarder for Telkomsel. We bring in telecom equipment for district
											capitals all over Indonesia using the Priority Lane facility, and managed a bonded warehouse from
											2004 to 2006. We provide export services like warehouse management, export documentation, shipment
											arrangement, container stuffing, trucking, haulage, and ocean freight. 12.7k shipments were
											successfully processed in two years!
										</p>
									</h2>
								</div>
							</article>
							<article className="md:grid md:grid-cols-4 md:items-baseline">
								<div className="group relative flex flex-col items-start md:col-span-3">
									<h2 className="text-base font-semibold tracking-tight text-zinc-800 dark:text-zinc-100">
										<Link href="/blog/kementerian-kelautan-dan-perikanan-ri">
											Kementerian Kelautan dan Perikanan RI
										</Link>
										<p className="relative z-10 mt-2 text-sm text-zinc-600 dark:text-zinc-400">
											We delivered the materials for fish farming projects located on Sabang, Pangandaran, and
											Karimunjawa. We're getting 43 containers of mooring, cages, and nets from Norway, 4 containers of
											brackets for sinker tubes from China, and 3 feeding barges from Vietnam. We're also bringing in 2
											work boats from Batam to help with the transportation. So far, we've successfully processed 73
											shipments!
										</p>
									</h2>
								</div>
							</article>
							<article className="md:grid md:grid-cols-4 md:items-baseline">
								<div className="group relative flex flex-col items-start md:col-span-3">
									<h2 className="text-base font-semibold tracking-tight text-zinc-800 dark:text-zinc-100">
										<Link href="/blog/pt-pal-indonesia">PT PAL Indonesia</Link>
										<p className="relative z-10 mt-2 text-sm text-zinc-600 dark:text-zinc-400">
											We've sent a bunch of stuff from Korea to Surabaya. It includes ship materials for Palwo Bowono,
											Palpass 500 Project, Fast Patrol Ships for Indonesian Customs, and FPU for PT. Pertamina. We also
											sent two MPC project units, 8PA5L Main Diesel Engine, and PB1600 Auxiliary Main Diesel Engine. In
											total, we've made 567 deliveries!
										</p>
									</h2>
								</div>
							</article>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
