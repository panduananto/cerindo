import React, { useEffect, useState } from 'react';

import { Outlet } from 'react-router-dom';
import { HiOutlineMenu, HiOutlineBell } from 'react-icons/hi';
import { Transition } from '@headlessui/react';
import { useDebouncedCallback } from 'use-debounce';

import Sidebar from './Sidebar';

import classNames from '../../utils/classNames';

function LayoutDashboard() {
	const [sidebarOpen, setSidebarOpen] = useState(true);
	const [sidebarMode, setSidebarMode] = useState('side');
	const [windowWidth, setWindowWidth] = useState(window.innerWidth);

	const debouncedWidth = useDebouncedCallback(() => {
		setWindowWidth(window.innerWidth);
	}, 100);

	useEffect(() => {
		windowWidth >= 768 ? setSidebarMode('side') : setSidebarMode('over');

		window.addEventListener('resize', debouncedWidth);

		return () => {
			window.removeEventListener('resize', debouncedWidth);
		};
	}, [windowWidth, debouncedWidth]);

	return (
		<div id="home" className="relative flex h-full min-h-full flex-row">
			<Transition
				as={React.Fragment}
				show={sidebarOpen && sidebarMode === 'over'}
				enter="transition-opacity duration-200"
				enterFrom="opacity-0"
				enterTo="opacity-100"
				leave="transition-opacity duration-200"
				leaveFrom="opacity-100"
				leaveTo="opacity-0"
			>
				<div className={`absolute z-[50] block h-full w-full bg-black/70`} onClick={() => setSidebarOpen(false)}></div>
			</Transition>
			<Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} windowWidth={windowWidth}></Sidebar>
			<main
				className={classNames(
					sidebarOpen ? 'ml-0 w-full md:ml-[280px] md:w-[calc(100%-280px)]' : 'ml-0 w-full',
					'absolute flex min-h-full flex-col transition-sidebar duration-300 ease-in-out'
				)}
			>
				<nav className="sticky inset-x-0 top-0 z-40 w-full border-b border-slate-300 bg-white transition-transform duration-150 ease-in-out">
					<div className="relative mx-auto flex h-16 max-w-full items-center justify-between px-4 sm:px-6 lg:px-8">
						<button
							type="button"
							className="inline-flex items-center justify-center rounded bg-white p-2 text-slate-500 transition-colors duration-150 ease-in-out hover:bg-slate-100 hover:text-slate-600 focus:bg-slate-100 focus:outline-none focus:ring-0"
							onClick={() => setSidebarOpen(!sidebarOpen)}
						>
							<HiOutlineMenu className="h-6 w-6"></HiOutlineMenu>
						</button>
						<div className="flex flex-row items-center space-x-2">
							<button
								type="button"
								className="inline-flex items-center justify-center rounded bg-white p-2 text-slate-500 transition-colors duration-150 ease-in-out hover:bg-slate-100 hover:text-slate-600 focus:bg-slate-100 focus:outline-none focus:ring-0"
							>
								<HiOutlineBell className="h-6 w-6"></HiOutlineBell>
							</button>
							<div>
								<button className="flex items-center rounded-full">
									<img
										src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
										className="h-10 w-10 rounded-full"
										alt="User profile"
									/>
								</button>
							</div>
						</div>
					</div>
				</nav>
				<Outlet></Outlet>
			</main>
		</div>
	);
}

export default LayoutDashboard;
