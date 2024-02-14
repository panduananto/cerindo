import '@/styles/index.css'

import React from 'react'
import { Metadata, Viewport } from 'next'

import { env } from '@/env.mjs'

import { inter } from '@/config/font'
import { siteConfig } from '@/config/site'

import { Toaster } from '@/components/ui/sonner'

export const viewport: Viewport = {
	themeColor: [
		{ media: '(prefers-color-scheme: light)', color: 'white' },
		{ media: '(prefers-color-scheme: dark)', color: 'black' },
	],
}

export const metadata: Metadata = {
	metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
	title: {
		default: siteConfig.name,
		template: `%s - ${siteConfig.name}`,
	},
	description: siteConfig.description,
	keywords: [
		'Next.js',
		'React',
		'Tailwind CSS',
		'Server components',
		'Server actions',
		'Cerindo',
		'Freight forwarder',
		'Import',
		'Export',
		'PPJK',
		'Customs clearance',
		'Bea cukai',
	],
	authors: [
		{
			name: 'panduananto',
			url: 'https://github.com/panduananto',
		},
	],
	creator: 'panduananto',
	openGraph: {
		type: 'website',
		locale: 'en_US',
		url: siteConfig.url,
		title: siteConfig.name,
		description: siteConfig.description,
		siteName: siteConfig.name,
	},
	icons: {
		icon: '/favicon.ico',
		apple: '/apple-touch-icon.png',
	},
	manifest: `${siteConfig.url}/site.webmanifest`,
}

type RootLayoutProps = {
	children: React.ReactNode
}

export default async function RootLayout({ children }: RootLayoutProps) {
	return (
		<html lang="en" className={`${inter.className} h-full scroll-smooth`}>
			<head />
			<body className="h-full bg-white text-slate-900">
				{children}
				<Toaster position="top-right" richColors />
			</body>
		</html>
	)
}
