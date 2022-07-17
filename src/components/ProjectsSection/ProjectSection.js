import React from 'react';

import { Swiper, SwiperSlide } from 'swiper/react';

import ProjectSectionContent from './ProjectSectionContent';

import { projects } from '../../data';

function ProjectSection() {
	return (
		<div className="mt-6 w-full rounded md:mt-10">
			<Swiper
				slidesPerView={1}
				centeredSlides={true}
				spaceBetween={16}
				breakpoints={{ 1120: { slidesPerView: 1.2, centeredSlides: true } }}
			>
				{projects.map((project) => (
					<SwiperSlide key={project.title.split(' ').join('-')} className="!h-auto !self-stretch">
						<ProjectSectionContent project={project}></ProjectSectionContent>
					</SwiperSlide>
				))}
			</Swiper>
		</div>
	);
}

export default ProjectSection;
