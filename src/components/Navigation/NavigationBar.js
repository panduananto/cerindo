import React, { useState } from 'react';

import { Transition } from '@headlessui/react';
import { HiOutlineMenu } from 'react-icons/hi';

import NavigationMenu from './NavigationMenu';
import NavigationMobile from './NavigationMobile';

import { navigationItems } from '../../data';

export default function NavigationBar() {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<div className="relative w-full">
			<div className="relative mx-auto flex max-w-6xl items-center py-4 px-4 sm:px-6 md:py-7 lg:px-8">
				<div className="flex flex-shrink-0 flex-grow items-center lg:flex-grow-0">
					<div className="flex w-full items-center justify-between 2md:w-auto">
						<a href="/">
							<img src="/images/cerindo_logo.svg" className="h-14 w-auto text-[#9d001b] sm:h-16" alt="Cerindo logo" />
						</a>
						<div className="-mr-2 flex items-center 2md:hidden">
							<button
								type="button"
								className="inline-flex items-center justify-center rounded bg-white p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-500 focus:outline-none focus:ring-2 focus:ring-red-500"
								onClick={() => setIsOpen(!isOpen)}
							>
								<HiOutlineMenu className="h-6 w-6"></HiOutlineMenu>
							</button>
						</div>
					</div>
				</div>
				<div className="ml-14 hidden w-full items-center 2md:flex">
					<NavigationMenu items={navigationItems}></NavigationMenu>
					<div className="ml-auto flex items-center">
						<a href="/" className="block font-medium text-slate-900 hover:text-red-600">
							Log in
						</a>
						<a
							role="button"
							href="/"
							className="ml-8 block rounded bg-red-600 px-6 py-3 font-semibold text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
						>
							Sign up
						</a>
					</div>
				</div>
			</div>
			<Transition
				show={isOpen}
				enter="transform transition duration-150"
				enterFrom="opacity-0 scale-95"
				enterTo="opacity-100 scale-100"
				leave="transform transition duration-150 ease-in-out"
				leaveFrom="opacity-100 scale-100"
				leaveTo="opacity-0 scale-95"
				className="absolute inset-x-0 top-0 z-30 origin-top-right transform p-2 transition 2md:hidden"
			>
				<NavigationMobile items={navigationItems} isOpen={isOpen} setIsOpen={setIsOpen} />
			</Transition>
		</div>
	);
}
