import React from 'react'

import { Outlet } from 'react-router-dom'

import Footer from './Footer'
import NavigationBar from './Navigation/NavigationBar'

function Layout() {
	return (
		<div id="home" className="flex min-h-full flex-col">
			<NavigationBar></NavigationBar>
			<main className="w-full">
				<Outlet></Outlet>
			</main>
			<Footer></Footer>
		</div>
	)
}

export default Layout
