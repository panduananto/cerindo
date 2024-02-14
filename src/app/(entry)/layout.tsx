import React from 'react'
import { notFound } from 'next/navigation'

import { getSupabaseServerClient } from '@/lib/supabase/server'

import SiteFooter from '@/components/layouts/site-footer'
import SiteHeader from '@/components/layouts/site-header'

type EntryLayoutProps = {
	children: React.ReactNode
}

export default async function EntryLayout({ children }: EntryLayoutProps) {
	const supabase = getSupabaseServerClient()

	const {
		data: { user },
	} = await supabase.auth.getUser()

	if (!user) {
		return notFound()
	}

	return (
		<div className="flex min-h-full flex-col">
			<SiteHeader user={user} />
			<main>{children}</main>
			<SiteFooter />
		</div>
	)
}
