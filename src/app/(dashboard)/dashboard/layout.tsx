import React from 'react'

type DashboardLayoutProps = {
	children: React.ReactNode
}

export default async function DashboardLayout({ children }: DashboardLayoutProps) {
	return (
		<div className="h-[calc(100vh-64px)] w-full overflow-y-auto bg-slate-50 p-8 text-slate-900 sm:px-10 lg:px-12">
			{children}
		</div>
	)
}
