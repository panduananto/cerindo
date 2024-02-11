import React from 'react'

type DashboardLayoutProps = {
	children: React.ReactNode
}

export default async function DashboardLayout({ children }: DashboardLayoutProps) {
	return <div className="h-[calc(100vh-64px)] w-full overflow-y-auto bg-slate-50 text-slate-900">{children}</div>
}
