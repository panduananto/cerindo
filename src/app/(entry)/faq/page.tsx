import React from 'react'

import { env } from '@/env'

import { rubik } from '@/config/font'

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'

import type { Metadata } from 'next'

export const metadata: Metadata = {
	metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
	title: 'FAQ',
	description: 'We are Cerindo',
}

export default async function AboutUsPage() {
	return (
		<div className="mx-auto flex w-full max-w-6xl flex-col px-4 py-8 sm:px-6 lg:px-8">
			<div className="py-8">
				<h1 className={`${rubik.className} text-xl font-extrabold text-secondary-foreground sm:text-2xl md:text-3xl`}>
					FAQ <span className="text-sm font-light">(frequently asked questions)</span>
				</h1>
				<div>
					<Accordion type="single" collapsible className="w-full space-y-2">
						<AccordionItem value="item-1">
							<AccordionTrigger className="w-full">Apa itu impor?</AccordionTrigger>
							<AccordionContent className="text-justify">
								Impor adalah proses transportasi barang atau komoditas dari suatu negara ke negara lain secara legal,
								umumnya dalam proses perdagangan. roses impor umumnya adalah tindakan memasukan barang atau komoditas
								dari negara lain ke dalam negeri. Impor barang secara besar umumnya membutuhkan campur tangan dari bea
								cukai di negara pengirim maupun penerima. Impor adalah bagian penting dari perdagangan internasional.
							</AccordionContent>
						</AccordionItem>
						<AccordionItem value="item-2">
							<AccordionTrigger className="w-full">Apa itu ekspor?</AccordionTrigger>
							<AccordionContent className="text-justify">
								Ekspor adalah proses transportasi barang atau komoditas dari suatu negara ke negara lain. Proses ini
								sering kali digunakan oleh perusahaan dengan skala bisnis kecil sampai menengah sebagai strategi utama
								untuk bersaing di tingkat internasional.
							</AccordionContent>
						</AccordionItem>
						<AccordionItem value="item-3">
							<AccordionTrigger className="w-full">Apa itu PPJK?</AccordionTrigger>
							<AccordionContent className="text-justify">
								Perusahaan Pengurusan Jasa Kepabeanan (PPJK) merupakan Perusahaan yang bertindak menyediakan jasa
								pengurusan tentang formalitas kepabeanan dan hal-hal yang terkait di dalamnya. PPJK mengurus barang
								impor yang wajib membayar pajak bea masuk sehingga padanya dikenakan jaminan bahwa PPJK telah
								bertanggung jawab untuk melunasi pajak bea masuk berdasarkan kuasa dari Perusahaan atau perorangan
								selaku Importir.
							</AccordionContent>
						</AccordionItem>
					</Accordion>
				</div>
			</div>
		</div>
	)
}
