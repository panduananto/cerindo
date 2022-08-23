import React from 'react';

import { HiOutlineBell, HiOutlineMenu } from 'react-icons/hi';

import DashboardNavigationPopover from './DashboardNavigationPopover';

function DashboardNavigationBar({ user, sidebarOpen, setSidebarOpen }) {
	return (
		<nav className="sticky inset-x-0 top-0 z-40 w-full border-b border-slate-300 bg-white shadow-sm transition-transform duration-150 ease-in-out">
			<div className="relative mx-auto flex h-16 max-w-full items-center justify-between px-4 sm:px-6 lg:px-8">
				<button
					type="button"
					className="inline-flex items-center justify-center rounded bg-white p-2 text-slate-500 transition-colors duration-150 ease-in-out hover:bg-slate-100 hover:text-slate-600 focus:bg-slate-100 focus:outline-none focus:ring-0"
					onClick={() => setSidebarOpen(!sidebarOpen)}
				>
					<HiOutlineMenu className="h-6 w-6" />
				</button>
				<div className="flex flex-row items-center space-x-2">
					<button
						type="button"
						className="inline-flex items-center justify-center rounded bg-white p-2 text-slate-500 transition-colors duration-150 ease-in-out hover:bg-slate-100 hover:text-slate-600 focus:bg-slate-100 focus:outline-none focus:ring-0"
					>
						<HiOutlineBell className="h-6 w-6" />
					</button>
					<DashboardNavigationPopover user={user} />
				</div>
			</div>
		</nav>
	);
}

export default DashboardNavigationBar;
