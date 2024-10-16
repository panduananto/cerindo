'use client'

import React from 'react'
import Link from 'next/link'

import { rubik } from '@/config/font'

import Logo from '../logo'
import Icons from '../ui/icons'

function SiteFooter() {
	return (
		<footer className="mt-auto w-full border-t border-slate-300">
			<div className="mx-auto flex max-w-6xl flex-col space-x-0 px-4 py-7 sm:px-6 md:flex-row md:space-x-16 lg:space-x-24 lg:px-8">
				<div className="col-span-12 pb-6 pt-10 md:col-span-4 md:pb-10">
					<h6 className={`font-medium text-slate-700 ${rubik.className}`}>Stay tuned</h6>
					<p>Connect with us and stay in the loop</p>
					<div className="mt-4 flex items-center space-x-4">
						<Link href="https://www.instagram.com/cerindogroup/" target="_blank" rel="noreferrer noopener">
							<Icons.instagram className="size-4" aria-hidden="true" />
							<span className="sr-only">Instagram</span>
						</Link>
						<a href="mailto:customerservice@cerindo.co.id">
							<Icons.mail className="size-4" aria-hidden="true" />
							<span className="sr-only">Gmail</span>
						</a>
					</div>
				</div>
				<div className="col-span-12 pb-10 pt-6 md:col-span-8 md:pt-10">
					<div className="flex flex-col">
						<div className="font-medium text-slate-700">
							<h6 className={`${rubik.className}`}>Incorporated in</h6>
							<div className="space-x-4">
								<img src="/images/fiata_logo.svg" className="inline h-10 w-auto" alt="FIATA" />
								<img src="/images/gla_logo.svg" className="inline h-auto w-20" alt="Global Logistics Associates" />
								<img src="/images/alfi_ilfa_logo.svg" className="inline h-10 w-auto" alt="ALFI/ILFA" />
							</div>
						</div>
						<div className="mt-2">
							<h6 className={`font-medium text-slate-700 ${rubik.className}`}>Certified by</h6>
							<p>Committed to quality and excellence with</p>
							<div className="mt-5 space-x-4">
								<img src="/images/iso9001.svg" className="inline h-auto w-24" alt="ACS ISO 9001" />
								<img src="/images/iso45001.svg" className="inline h-auto w-24" alt="ACS ISO 45001" />
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="border-t border-slate-300 bg-secondary py-4 text-center text-xs text-secondary-foreground">
				<p>&#169; 2024 Cerindo</p>
			</div>
		</footer>
	)
}

export default SiteFooter
