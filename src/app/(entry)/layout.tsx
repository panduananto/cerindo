import React from 'react'
import { cookies } from 'next/headers'

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

	return (
		<div className="flex min-h-full flex-col">
			<SiteHeader user={user} />
			<main>{children}</main>
			<SiteFooter />
		</div>
	)
}
