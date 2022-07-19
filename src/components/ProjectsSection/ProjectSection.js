import React from 'react';

import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { HiOutlineArrowRight } from 'react-icons/hi';

import ProjectSectionContent from './ProjectSectionContent';

import { projects } from '../../data';

function ProjectSection() {
	return (
		<div className="mt-6 w-full rounded text-right md:mt-10">
			<Swiper
				slidesPerView={1}
				centeredSlidesBounds={true}
				spaceBetween={16}
				breakpoints={{ 1120: { slidesPerView: 1.2, centeredSlides: true } }}
			>
				{projects.map((project) => (
					<SwiperSlide key={project.title.split(' ').join('-')} className="!h-auto !self-stretch">
						<ProjectSectionContent project={project}></ProjectSectionContent>
					</SwiperSlide>
				))}
			</Swiper>
			<Link
				to="projects"
				className="mt-4 inline-flex items-center text-lg text-slate-900 hover:underline hover:underline-offset-4"
			>
				See more
				<HiOutlineArrowRight className="ml-2 h-5 w-5 text-slate-900"></HiOutlineArrowRight>
			</Link>
		</div>
	);
}

export default ProjectSection;
