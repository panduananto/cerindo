import React from 'react'
import { redirect } from 'next/navigation'

import { env } from '@/env'

import { getSupabaseServerClient } from '@/lib/supabase/server'

import WIP from '@/components/wip'

import type { Metadata } from 'next'

export const metadata: Metadata = {
	metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
	title: 'Cerindo | Dashboard',
	description: "Cerindo's powerful dashboard for efficient task management and insightful analytics",
}

export default async function ConsigneePage() {
	const supabase = getSupabaseServerClient()

	const {
		data: { user },
	} = await supabase.auth.getUser()

	if (!user) {
		redirect('/signin')
	}

	return <WIP />
}
