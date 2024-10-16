import React from 'react'

import { env } from '@/env'

import { rubik } from '@/config/font'

import type { Metadata } from 'next'

export const metadata: Metadata = {
	metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
	title: 'About Us',
	description: 'We are Cerindo',
}

export default async function AboutUsPage() {
	return (
		<div className="mx-auto flex w-full max-w-6xl flex-col px-4 py-8 sm:px-6 lg:px-8">
			<h1 className={`${rubik.className} text-xl font-extrabold text-secondary-foreground sm:text-2xl md:text-3xl`}>
				About us
			</h1>
		</div>
	)
}
