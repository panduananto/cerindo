import React from 'react'
import { redirect } from 'next/navigation'

import { env } from '@/env.mjs'

import { getSupabaseServerClient } from '@/lib/supabase/server'

import type { Metadata } from 'next'

export const metadata: Metadata = {
	metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
	title: 'Dashboard',
	description: "Cerindo's powerful dashboard for efficient task management and insightful analytics",
}

export default async function DashboardPage() {
	const supabase = getSupabaseServerClient()

	const {
		data: { user },
	} = await supabase.auth.getUser()

	if (!user) {
		redirect('/signin')
	}

	return (
		<div className="h-[calc(100vh-64px)] w-full overflow-y-auto bg-slate-50 p-8 text-slate-900 sm:px-10 lg:px-12"></div>
	)
}
