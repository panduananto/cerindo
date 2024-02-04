import React from 'react'

import { Popover, Transition } from '@headlessui/react'
import { HiOutlineLogout, HiOutlineUserCircle } from 'react-icons/hi'
import { IconContext } from 'react-icons/lib'
import { useNavigate } from 'react-router-dom'

import { useAuthContext } from '../../../contexts/AuthContext'

function DashboardNavigationPopover({ user }) {
	const { auth, signOut } = useAuthContext()

	const navigate = useNavigate()

	return (
		<Popover className="relative">
			<>
				<Popover.Button className="flex items-center rounded-full">
					{auth?.profile.avatar_image ? (
						<img
							src={auth?.profile.avatar_image}
							className="h-8 w-8 rounded-full bg-no-repeat object-cover object-center"
							alt="User profile"
						/>
					) : (
						<svg className="h-8 w-8 rounded-full text-gray-300" fill="currentColor" viewBox="0 0 24 24">
							<path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z"></path>
						</svg>
					)}
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
											<span className="mt-1.5 font-medium">{user?.email}</span>
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
											onClick={() => {
												signOut()
												navigate('/login', { replace: true })
											}}
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
	)
}

export default DashboardNavigationPopover
