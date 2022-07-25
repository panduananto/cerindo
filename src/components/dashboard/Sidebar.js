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
import { Dialog, Transition } from '@headlessui/react';

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
				<div className="overflow-y-auto py-4">
					<ul className="space-y-1">
						<IconContext.Provider value={{ className: 'h-6 w-6' }}>
							{sideBarNavigationItems.map((item) => (
								<li key={`sidebar-${item.text.split(' ').join('-')}`}>
									<NavLink
										to={item.link}
										className={(props) =>
											classNames(
												props.isActive ? 'bg-red-50 text-red-600' : 'text-slate-700 hover:bg-red-50 hover:text-red-600',
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
	);
}

export default Sidebar;
