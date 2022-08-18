import React from 'react';

import { IconContext } from 'react-icons/lib';
import { HiOutlineUserCircle, HiOutlineLogout } from 'react-icons/hi';
import { Popover, Transition } from '@headlessui/react';

import supabase from '../../../supabase';

function DashboardNavigationPopover() {
	const handleSignOut = async () => {
		await supabase.auth.signOut();
	};

	return (
		<Popover className="relative">
			<>
				<Popover.Button className="flex items-center rounded-full">
					<img
						src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
						className="h-8 w-8 rounded-full"
						alt="User profile"
					/>
				</Popover.Button>
				<Transition
					as={React.Fragment}
					enter="transition ease-out duration-200"
					enterFrom="opacity-0 translate-y-1"
					enterTo="opacity-100 translate-y-0"
					leave="transition ease-in duration-150"
					leaveFrom="opacity-100 translate-y-0"
					leaveTo="opacity-0 translate-y-1"
				>
					<Popover.Panel className="absolute -left-[70px] z-10 mt-2 w-[215px] max-w-[240px] -translate-x-1/2 transform">
						<IconContext.Provider value={{ className: 'h-6 w-6' }}>
							<div className="overflow-hidden rounded border border-slate-200 shadow-lg">
								<div className="space-y-2 divide-y divide-slate-200 bg-white py-2 text-slate-700">
									<div className="px-4 py-2 hover:bg-red-50">
										<span className="flex flex-col text-sm leading-none">
											<span>Signed in as</span>
											<span className="mt-1.5 font-medium">udnap@gmail.com</span>
										</span>
									</div>
									<ul className="pt-2">
										<li>
											<a
												role="button"
												className="flex items-center rounded px-4 py-2 text-[14px] font-medium leading-5 hover:bg-red-50 hover:text-red-600"
												href="##"
											>
												<span className="mr-3 shrink-0">
													<HiOutlineUserCircle />
												</span>
												<span className="pl-0">Profile</span>
											</a>
										</li>
									</ul>
									<div className="pt-2">
										<button
											className="flex w-full items-center rounded px-4 py-2 text-[14px] font-medium leading-5 hover:bg-red-50 hover:text-red-600"
											onClick={() => handleSignOut()}
										>
											<span className="mr-3 shrink-0">
												<HiOutlineLogout />
											</span>
											<span className="pl-0">Sign out</span>
										</button>
									</div>
								</div>
							</div>
						</IconContext.Provider>
					</Popover.Panel>
				</Transition>
			</>
		</Popover>
	);
}

export default DashboardNavigationPopover;
