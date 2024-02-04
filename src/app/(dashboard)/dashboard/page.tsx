import React from 'react'
import { redirect } from 'next/navigation'

import { getSupabaseServerClient } from '@/lib/supabase/server'

export default async function DashboardPage() {
	const supabase = getSupabaseServerClient()

	const {
		data: { user },
	} = await supabase.auth.getUser()

	if (!user) {
		redirect('/signin')
	}

	return <div>DashboardPage</div>
}
