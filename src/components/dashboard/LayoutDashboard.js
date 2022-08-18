import React, { useEffect, useState } from 'react';

import { Outlet } from 'react-router-dom';
import { Transition } from '@headlessui/react';

import Sidebar from './Sidebar';

import useDebouncedWindowSize from '../../hooks/useDebouncedWindowSize';
import classNames from '../../utils/classNames';
import DashboardNavigationBar from './Navigation/DashboardNavigationBar';

function LayoutDashboard() {
	const [sidebarOpen, setSidebarOpen] = useState(true);
	const [sidebarMode, setSidebarMode] = useState('side');

	const windowSize = useDebouncedWindowSize(100);

	useEffect(() => {
		windowSize.width >= 768 ? setSidebarMode('side') : setSidebarMode('over');
	}, [windowSize.width]);

	return (
		<div id="home" className="relative flex h-full min-h-full flex-row">
			<Transition
				as={React.Fragment}
				show={sidebarOpen && sidebarMode === 'over'}
				enter="transition-opacity duration-300"
				enterFrom="opacity-0"
				enterTo="opacity-100"
				leave="transition-opacity duration-300"
				leaveFrom="opacity-100"
				leaveTo="opacity-0"
			>
				<div
					className="absolute z-[50] block h-full w-full bg-black/70"
					onClick={() => setSidebarOpen(false)}
				></div>
			</Transition>
			<Sidebar
				sidebarOpen={sidebarOpen}
				setSidebarOpen={setSidebarOpen}
				windowWidth={windowSize.width}
			></Sidebar>
			<main
				className={classNames(
					sidebarOpen ? 'ml-0 w-full md:ml-[280px] md:w-[calc(100%-280px)]' : 'ml-0 w-full',
					'absolute flex min-h-full flex-col transition-sidebar duration-300 ease-in-out'
				)}
			>
				<DashboardNavigationBar
					sidebarOpen={sidebarOpen}
					setSidebarOpen={setSidebarOpen}
				></DashboardNavigationBar>
				<Outlet></Outlet>
			</main>
		</div>
	);
}

export default LayoutDashboard;
