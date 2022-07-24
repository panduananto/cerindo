import React from 'react';

import { NavLink } from 'react-router-dom';
import { IconContext } from 'react-icons/lib';
import {
	HiOutlineHome,
	HiOutlineCheckCircle,
	HiOutlineCurrencyDollar,
	HiOutlineDocumentReport,
	HiOutlineClipboardList,
	HiOutlineDatabase,
} from 'react-icons/hi';
import { Transition } from '@headlessui/react';

import classNames from '../../utils/classNames';

const sideBarNavigationItems = [
	{
		text: 'Dashboard',
		link: '',
		icon: <HiOutlineHome></HiOutlineHome>,
	},
	{
		text: 'Checklist Shipment',
		link: 'checklist-shipment',
		icon: <HiOutlineCheckCircle></HiOutlineCheckCircle>,
	},
	{
		text: 'Cash Bank Requisition',
		link: 'cbr',
		icon: <HiOutlineCurrencyDollar></HiOutlineCurrencyDollar>,
	},
	{
		text: 'Shipment Report',
		link: 'shipment-report',
		icon: <HiOutlineDocumentReport></HiOutlineDocumentReport>,
	},
	{
		text: 'Pertanggungjawaban',
		link: 'ptj',
		icon: <HiOutlineClipboardList></HiOutlineClipboardList>,
	},
	{
		text: 'Master Data',
		link: 'master-data',
		icon: <HiOutlineDatabase></HiOutlineDatabase>,
		children: [
			{
				text: 'Shipper',
				link: 'shipper',
			},
			{
				text: 'Consignee',
				link: 'consignee',
			},
			{
				text: 'Agent',
				link: 'agent',
			},
		],
	},
];

function Sidebar({ sidebarOpen }) {
	return (
		<Transition
			as={React.Fragment}
			show={sidebarOpen}
			enter="transition ease-in-out duration-300 transform"
			enterFrom="-translate-x-full"
			enterTo="translate-x-0"
			leave="transition ease-in-out duration-300 transform"
			leaveFrom="translate-x-0"
			leaveTo="-translate-x-full"
		>
			<div className="absolute top-0 left-0 z-50 h-full border-r border-slate-300 bg-white">
				<div className="w-[260px] max-w-[260px]">
					<div className="flex h-20 items-center py-4 px-6 pb-0">
						<img src="/images/cerindo_logo.svg" className="h-14 w-auto" alt="Cerindo text logo" />
					</div>
					<div className="overflow-y-auto py-4">
						<ul className="space-y-1">
							<IconContext.Provider value={{ className: 'h-6 w-6' }}>
								{sideBarNavigationItems.map((item) => (
									<li key={`sidebar-${item.text.split(' ').join('-')}`}>
										<NavLink
											to={item.link}
											className={(props) =>
												classNames(
													props.isActive
														? 'bg-red-50 text-red-600'
														: 'text-slate-700 hover:bg-red-50 hover:text-red-600',
													'mx-2 flex items-center rounded px-4 py-2 text-[13px] text-base font-semibold'
												)
											}
										>
											<span className="mr-3">{item.icon}</span>
											{item.text}
										</NavLink>
									</li>
								))}
							</IconContext.Provider>
						</ul>
					</div>
				</div>
			</div>
		</Transition>
	);
}

export default Sidebar;
