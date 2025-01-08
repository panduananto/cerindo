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

export default async function FAQPAge() {
	return (
		<div className="mx-auto flex w-full max-w-6xl flex-col px-4 py-8 sm:px-6 lg:px-8">
			<div className="py-8">
				<h1 className={`${rubik.className} text-xl font-extrabold text-secondary-foreground sm:text-2xl md:text-3xl`}>
					FAQ <span className="text-sm font-light">(frequently asked questions)</span>
				</h1>
				<div>
					<Accordion type="single" collapsible className="w-full space-y-2">
						<AccordionItem value="item-1">
							<AccordionTrigger className="w-full">What is import?</AccordionTrigger>
							<AccordionContent className="text-justify">
								Import is the process of transporting goods or commodities from one country to another legally, usually
								in the process of trade. The import process is generally the act of bringing goods or commodities from
								another country into the country. Large imports of goods generally require intervention from customs in
								both the sending and receiving countries. Import is an important part of international trade.
							</AccordionContent>
						</AccordionItem>
						<AccordionItem value="item-2">
							<AccordionTrigger className="w-full">What is export?</AccordionTrigger>
							<AccordionContent className="text-justify">
								Export is the process of transporting goods or commodities from one country to another. This process is
								often used by small to medium-sized businesses as a primary strategy to compete internationally.
							</AccordionContent>
						</AccordionItem>
						<AccordionItem value="item-3">
							<AccordionTrigger className="w-full">What is PPJK?</AccordionTrigger>
							<AccordionContent className="text-justify">
								Customs Service Management Company (PPJK as in Indonesian) is a company that acts to provide services
								for managing customs formalities and related matters. PPJK handles imported goods that are required to
								pay import duty so that it is subject to a guarantee that PPJK has been responsible for paying import
								duty based on the power of attorney from the Company or individual as the Importer.
							</AccordionContent>
						</AccordionItem>
					</Accordion>
				</div>
			</div>
		</div>
	)
}
