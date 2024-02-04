import React, { useEffect, useState } from 'react'

import { Transition } from '@headlessui/react'
import { Outlet } from 'react-router-dom'

import { useAuthContext } from '../../contexts/AuthContext'
import useDebouncedWindowSize from '../../hooks/useDebouncedWindowSize'
import supabase from '../../supabase'
import classNames from '../../utils/classNames'
import ProfileForm from '../ProfileForm'
import DashboardNavigationBar from './Navigation/DashboardNavigationBar'
import Sidebar from './Sidebar'

function LayoutDashboard() {
	const { auth } = useAuthContext()

	const [userProfile, setUserProfile] = useState([])
	const [profileFormOpen, setProfileFormOpen] = useState(false)
	const [sidebarOpen, setSidebarOpen] = useState(true)
	const [sidebarMode, setSidebarMode] = useState('side')

	const windowSize = useDebouncedWindowSize(100)

	useEffect(() => {
		const checkIfUserProfileExists = async () => {
			const { id } = auth?.session.user
			const { data, error } = await supabase.from('profiles').select('id').eq('id', id)

			if (error) throw error

			setUserProfile(data.length !== 0 ? [...data] : [])
			setProfileFormOpen(userProfile.length === 0 ? true : false)
		}

		checkIfUserProfileExists()
	}, [auth?.session.user, userProfile.length])

	useEffect(() => {
		windowSize.width >= 768 ? setSidebarMode('side') : setSidebarMode('over')
	}, [windowSize.width])

	return (
		<div id="home" className="relative flex h-full min-h-full flex-row">
			<Transition appear={true} show={userProfile.length === 0 && profileFormOpen} as={React.Fragment}>
				<div>
					<ProfileForm
						user={auth?.session.user}
						profileFormOpen={profileFormOpen}
						setProfileFormOpen={setProfileFormOpen}
					/>
				</div>
			</Transition>
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
				<div className="absolute z-[50] block h-full w-full bg-black/70" onClick={() => setSidebarOpen(false)}></div>
			</Transition>
			<Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} windowWidth={windowSize.width} />
			<main
				className={classNames(
					sidebarOpen ? 'ml-0 w-full md:ml-[280px] md:w-[calc(100%-280px)]' : 'ml-0 w-full',
					'transition-sidebar absolute flex min-h-full flex-col duration-300 ease-in-out',
				)}
			>
				<DashboardNavigationBar user={auth?.session.user} sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
				<Outlet context={[auth?.profile]}></Outlet>
			</main>
		</div>
	)
}

export default LayoutDashboard
