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
			></Route>
			<Route
				path="registration"
				element={auth?.session ? <Navigate to="/dashboard"></Navigate> : <Signup />}
			></Route>
			<Route path="/" element={<Layout />}>
				<Route index={true} element={<Home />}></Route>
				<Route path="projects" element={<Projects />}></Route>
				<Route path="about-us" element={<AboutUs />}></Route>
			</Route>
			<Route element={<RequiredAuth />}>
				<Route path="/dashboard" element={<LayoutDashboard />}>
					<Route index={true} element={<HomeDashboard />}></Route>
				</Route>
			</Route>
			<Route path="*" element={<NotFound />}></Route>
		</Routes>
	);
}

export default App;
