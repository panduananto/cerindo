import React from 'react';

import { Outlet } from 'react-router-dom';

import NavigationBar from './Navigation/NavigationBar';
import Footer from './Footer';

function Layout() {
	return (
		<div className="flex min-h-full flex-col">
			<NavigationBar></NavigationBar>
			<main className="w-full">
				<Outlet></Outlet>
			</main>
			<Footer></Footer>
		</div>
	);
}

export default Layout;
