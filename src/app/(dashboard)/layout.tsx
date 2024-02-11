import React from 'react'
import { notFound } from 'next/navigation'

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
		data: { user },
	} = await supabase.auth.getUser()

	if (!user) {
		return notFound()
	}

	return (
		<div className="relative flex h-full min-h-full flex-row overflow-hidden">
			<SidebarNavProvider>
				<SidebarNav items={dashboardConfig.sidebarNav} />
				<DashboardMainArea user={user}>{children}</DashboardMainArea>
			</SidebarNavProvider>
		</div>
	)
}
