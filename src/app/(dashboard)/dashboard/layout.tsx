import React from 'react'

import StoreProvider from '@/components/providers/store-provider'

type DashboardLayoutProps = {
	children: React.ReactNode
}

export default async function DashboardLayout({ children }: DashboardLayoutProps) {
	return (
		<StoreProvider>
			<div className="relative h-[calc(100vh-65px)] w-full bg-muted">{children}</div>
		</StoreProvider>
	)
}
