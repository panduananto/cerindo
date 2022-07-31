import React, { useEffect } from 'react';

import { Routes, Route, useLocation } from 'react-router-dom';

import Home from './routes/home';
import Projects from './routes/projects';
import AboutUs from './routes/about-us';
import Login from './routes/login';
import Signup from './routes/signup';
import HomeDashboard from './routes/dashboard/home';

import Layout from './components/Layout';
import LayoutDashboard from './components/Dashboard/LayoutDashboard';
import NotFound from './components/NotFound';

import 'swiper/css/bundle';

function App() {
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
			<Route path="login" element={<Login></Login>}></Route>
			<Route path="registration" element={<Signup></Signup>}></Route>
			<Route path="/" element={<Layout></Layout>}>
				<Route index={true} element={<Home></Home>}></Route>
				<Route path="projects" element={<Projects></Projects>}></Route>
				<Route path="about-us" element={<AboutUs></AboutUs>}></Route>
			</Route>
			<Route path="/dashboard" element={<LayoutDashboard></LayoutDashboard>}>
				<Route index={true} element={<HomeDashboard></HomeDashboard>}></Route>
			</Route>
			<Route path="*" element={<NotFound></NotFound>}></Route>
		</Routes>
	);
}

export default App;
