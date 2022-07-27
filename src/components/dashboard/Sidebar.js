import React, { useEffect } from 'react';

import { IconContext } from 'react-icons/lib';

import Tree from './Tree/Tree';

import classNames from '../../utils/classNames';

import { sideBarNavigationItems } from '../../data/index';

function Sidebar({ sidebarOpen, setSidebarOpen, windowWidth }) {
	useEffect(() => {
		windowWidth <= 768 ? setSidebarOpen(false) : setSidebarOpen(true);
	}, [windowWidth, setSidebarOpen]);

	return (
		<div
			className={classNames(
				sidebarOpen ? 'translate-x-0' : '-translate-x-full',
				'sticky top-0 z-50 h-full transform border-r border-slate-300 bg-white transition duration-300 ease-in-out'
			)}
		>
			<div className="w-[280px] max-w-[280px]">
				<div className="flex h-20 items-center py-4 px-6 pb-0">
					<img src="/images/cerindo_logo.svg" className="h-14 w-auto" alt="Cerindo text logo" />
				</div>
				<div className="select-none overflow-y-auto py-4">
					<IconContext.Provider value={{ className: 'h-6 w-6' }}>
						<Tree items={sideBarNavigationItems}></Tree>
					</IconContext.Provider>
				</div>
			</div>
		</div>
	);
}

export default Sidebar;
