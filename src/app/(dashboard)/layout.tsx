import React from 'react'
import { redirect } from 'next/navigation'

import { dashboardConfig } from '@/config/dashboard'
import { getSupabaseServerClient } from '@/lib/supabase/server'

import DashboardMainArea from '@/components/layouts/dashboard-main-area'
import { SidebarNav, SidebarNavProvider } from '@/components/layouts/sidebar-nav'

type DashboardRootLayoutProps = {
	children: React.ReactNode
}

export default async function DashboardRootLayout({ children }: DashboardRootLayoutProps) {
	const supabase = getSupabaseServerClient()

	const {
		data: { session },
	} = await supabase.auth.getSession()

	if (!session?.user) {
		return redirect('/signin')
	}

	return (
		<div className="relative flex h-full min-h-full flex-row overflow-hidden">
			<SidebarNavProvider>
				<SidebarNav items={dashboardConfig.sidebarNav} />
				<DashboardMainArea user={session.user}>{children}</DashboardMainArea>
			</SidebarNavProvider>
		</div>
	)
}
