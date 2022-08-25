import React, { useEffect } from 'react';

import { Routes, Route, useLocation, Navigate } from 'react-router-dom';

import { useAuthContext } from './contexts/AuthContext';

import Layout from './components/Layout';
import LayoutDashboard from './components/Dashboard/LayoutDashboard';

import Home from './routes/home';
import Projects from './routes/projects';
import AboutUs from './routes/about-us';
import Login from './routes/login';
import Signup from './routes/signup';
import HomeDashboard from './routes/dashboard/home';
import AklLookup from './routes/dashboard/akl-lookup';
import AKL from './routes/dashboard/data/akl';
import NotFound from './components/NotFound';
import RequiredAuth from './components/RequiredAuth';

import 'swiper/css/bundle';

function App() {
	const { auth } = useAuthContext();
	const { pathname } = useLocation();

	useEffect(() => {
		window.scrollTo({
			top: 0,
			left: 0,
			behavior: 'smooth',
		});
	}, [pathname]);

	return (
		<Routes>
			<Route
				path="login"
				element={auth?.session ? <Navigate to="/dashboard"></Navigate> : <Login />}
			/>
			<Route
				path="registration"
				element={auth?.session ? <Navigate to="/dashboard"></Navigate> : <Signup />}
			/>
			<Route path="/" element={<Layout />}>
				<Route index={true} element={<Home />} />
				<Route path="projects" element={<Projects />} />
				<Route path="about-us" element={<AboutUs />} />
			</Route>
			<Route element={<RequiredAuth />}>
				<Route path="/dashboard" element={<LayoutDashboard />}>
					<Route index={true} element={<HomeDashboard />} />
					<Route path="akl" element={<AklLookup />} />
					<Route path="data">
						<Route path="akl" element={<AKL />}></Route>
					</Route>
				</Route>
			</Route>
			<Route path="*" element={<NotFound />} />
		</Routes>
	);
}

export default App;
