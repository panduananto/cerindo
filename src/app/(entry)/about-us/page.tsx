import React from 'react'

import { env } from '@/env'

import type { Metadata } from 'next'

export const metadata: Metadata = {
	metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
	title: 'About Us',
	description: 'We are Cerindo',
}

export default async function AboutUsPage() {
	return <div>About us page</div>
}
