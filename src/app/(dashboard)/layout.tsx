import React from 'react'
import { notFound } from 'next/navigation'

import { dashboardConfig } from '@/config/dashboard'
import { getSupabaseServerClient } from '@/lib/supabase/server'
import { cn } from '@/lib/utils'

import DashboardMainArea from '@/components/layouts/dashboard-main-area'
import { SidebarNav, SidebarNavButtonToggler, SidebarNavProvider } from '@/components/layouts/sidebar-nav'
import UserAccountNav from '@/components/user-account-nav'

type DashboardLayoutProps = {
	children: React.ReactNode
}

export default async function DashboardLayout({ children }: DashboardLayoutProps) {
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
