import React from 'react'
import Image from 'next/image'

import { env } from '@/env'

import { rubik } from '@/config/font'

import type { Metadata } from 'next'

export const metadata: Metadata = {
	metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
	title: 'blog - PT PAL Indonesia',
	description: 'We are Cerindo',
}

export default async function BlogPage() {
	return (
		<div className="mx-auto flex w-full max-w-6xl flex-col px-4 py-8 sm:px-6 lg:px-8">
			<div className="py-8">
				<article>
					<header>
						<h1
							className={`${rubik.className} text-4xl font-extrabold text-secondary-foreground sm:text-3xl md:text-5xl`}
						>
							PT PAL Indonesia
						</h1>
					</header>
					<div className="prose-lg mt-4">
						<p>
							Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus blanditiis itaque delectus voluptatem, quia
							velit ad suscipit officia! Quasi tenetur facilis quibusdam ratione mollitia voluptas laudantium rerum,
							suscipit accusamus similique illum magni, blanditiis officia laboriosam quaerat velit odio enim? Deleniti
							eum qui at reprehenderit accusantium? Qui explicabo, porro obcaecati accusantium minima, eum quas sapiente
							dolorum corrupti eos assumenda, provident accusamus.
						</p>
						<Image
							src="https://fastly.picsum.photos/id/473/1280/720.jpg?hmac=Tr4_rkxB57GxP156rGzP1Q2n6imxc9jdPHBcr3eicWA"
							alt="Container storage site"
							width={1280}
							height={720}
							quality={100}
							sizes="100vw"
							priority
							className="rounded-lg bg-no-repeat object-cover object-center"
						/>
						<h2>Lorem ipsum dolor sit amet consectetur.</h2>
						<p>
							Idem se saxa fata pollentibus geminos; quos pedibus. Est urnis Herses omnes nec divite: et ille illa furit
							sim verbis Cyllenius.
						</p>
						<p>
							Deus feram verumque, fecit, ira tamen, terras per alienae victum. Mutantur levitate quas ubi arcum ripas
							oculos abest. Adest commissaque victae in gemitus nectareis ire diva dotibus ora, et findi huic invenit;
							fatis? Fractaque dare superinposita nimiumque simulatoremque sanguine, at voce aestibus diu! Quid veterum
							hausit tu nil utinam paternos ima, commentaque.
						</p>
						<ol className="list-decimal">
							<li>Lorem ipsum dolor sit.</li>
							<li>Dictis carissime fugae</li>
							<li>Siquos vulgus</li>
							<li>A tacitos nulla viginti</li>
						</ol>
						<p>
							Ungues fistula annoso, ille addit linoque motatque uberior verso rubuerunt confine desuetaque. Sanguine
							anteit emerguntque expugnacior est pennas iniqui ecce haeret genus: peiora imagine fossas Cephisos
							formosa! Refugitque amata refelli supplex. Summa brevis vetuere tenebas, hostes vetantis, suppressit,
							arreptum regna. Postquam conpescit iuvenis habet corpus, et erratica, perdere, tot mota ars talis
						</p>
					</div>
				</article>
			</div>
		</div>
	)
}
