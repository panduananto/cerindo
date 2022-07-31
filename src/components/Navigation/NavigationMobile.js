import React from 'react';

import { Link, useLocation } from 'react-router-dom';
import { HiOutlineX } from 'react-icons/hi';

import Logo from '../Logo';

import classNames from '../../utils/classNames';

function NavigationMobile({ items, isOpen, setIsOpen }) {
	const location = useLocation();

	return (
		<div aria-hidden={!isOpen} className="overflow-hidden rounded border border-slate-300/50 bg-white shadow">
			<div className="flex items-center justify-between px-5 pt-4">
				<Logo></Logo>
				<div className="-mr-2">
					<button
						type="button"
						className="inline-flex items-center justify-center rounded bg-white p-2 text-slate-500 transition-colors duration-150 ease-in-out hover:bg-slate-100 hover:text-slate-600 focus:bg-slate-100 focus:outline-none focus:ring-0"
						onClick={() => setIsOpen(!isOpen)}
					>
						<HiOutlineX className="h-6 w-6"></HiOutlineX>
					</button>
				</div>
			</div>
			<div className="space-y-1 py-3 px-2">
				{items.map((item) => (
					<a
						key={`mobile-menu-item-${item.text}`}
						href={item.link}
						className={classNames(
							'block rounded px-3 py-2 text-base font-medium text-slate-700 transition-colors duration-150 ease-in-out first-letter:uppercase hover:bg-slate-100 hover:text-slate-900',
							location.hash === item.link ? 'border-l-4 border-slate-600 bg-slate-100' : 'bg-none'
						)}
					>
						{item.text}
					</a>
				))}
			</div>
			<div className="space-y-2 px-2 pb-3">
				<Link
					role="button"
					to="login"
					className="flex items-center justify-center rounded bg-red-100/70 px-3 py-2 font-semibold text-red-600 transition-colors duration-150 ease-in-out hover:bg-red-200/70 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2"
				>
					Log in
				</Link>
				<Link
					role="button"
					to="registration"
					className="flex items-center justify-center rounded bg-red-600 px-3 py-2 font-semibold text-white transition-colors duration-150 ease-in-out hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2"
				>
					Sign up
				</Link>
			</div>
		</div>
	);
}

export default NavigationMobile;
