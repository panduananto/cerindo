import React from 'react'

import { env } from '@/env'

import type { Metadata } from 'next'

export const metadata: Metadata = {
	metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
	title: 'About Us',
	description: 'We are Cerindo',
}

export default async function ProjectPage() {
	return <div>Project page</div>
}
