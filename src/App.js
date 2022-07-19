import React from 'react';

import { Routes, Route } from 'react-router-dom';

import Home from './routes/home';
import Projects from './routes/projects';
import AboutUs from './routes/about-us';

import Layout from './components/Layout';
import NotFound from './components/NotFound';

import 'swiper/css/bundle';

function App() {
	return (
		<Routes>
			<Route path="/" element={<Layout></Layout>}>
				<Route index={true} element={<Home></Home>}></Route>
				<Route path="projects" element={<Projects></Projects>}></Route>
				<Route path="about-us" element={<AboutUs></AboutUs>}></Route>
				<Route path="*" element={<NotFound></NotFound>}></Route>
			</Route>
		</Routes>
	);
}

export default App;
