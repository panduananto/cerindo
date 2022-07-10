import React from 'react';

import { HiOutlineX } from 'react-icons/hi';

function NavigationMobile({ items, isOpen, setIsOpen }) {
	return (
		<div aria-hidden={!isOpen} className="overflow-hidden rounded border border-slate-300/50 bg-white shadow">
			<div className="flex items-center justify-between px-5 pt-4">
				<div>
					<img src="/images/cerindo_logo.svg" className="h-14 w-auto text-[#9d001b] sm:h-16" alt="Cerindo logo" />
				</div>
				<div className="-mr-2">
					<button
						type="button"
						className="inline-flex items-center justify-center rounded bg-white p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-500 focus:outline-none focus:ring-2 focus:ring-red-500"
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
						className="block rounded px-3 py-2 text-base font-medium text-slate-700 first-letter:uppercase hover:bg-slate-100 hover:text-slate-900"
					>
						{item.text}
					</a>
				))}
			</div>
			<div className="space-y-2 px-2 pb-3">
				<a
					role="button"
					href="/"
					className="flex items-center justify-center rounded bg-red-100/70 px-3 py-2 font-semibold text-red-600 hover:bg-red-200/70 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2"
				>
					Log in
				</a>
				<a
					role="button"
					href="/"
					className="flex items-center justify-center rounded bg-red-600 px-3 py-2 font-semibold text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2"
				>
					Sign up
				</a>
			</div>
		</div>
	);
}

export default NavigationMobile;
