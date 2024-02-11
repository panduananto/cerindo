import React from 'react'
import { redirect } from 'next/navigation'

import { env } from '@/env.mjs'

import { rubik } from '@/config/font'
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
		<div className="flex h-full flex-col items-center justify-center">
			<h1 className={`${rubik.className} text-5xl font-semibold leading-8 2md:text-6xl`}>Halaman sedang dikerjakan</h1>
			<p className="mt-4 text-lg font-normal text-slate-700">Kami sedang mempersiapkan fitur yang lebih baik</p>
		</div>
	)
}
