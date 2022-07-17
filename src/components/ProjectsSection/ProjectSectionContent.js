import React from 'react';

import { useSwiperSlide } from 'swiper/react';

import ProjectSectionGallery from './ProjectSectionGallery';
import ProjectSectionText from './ProjectSectionText';

import classNames from '../../utils/classNames';

function ProjectSectionContent({ project }) {
	const { title, totalShipment, description, backgroundImage, images } = project;
	const swiperSlide = useSwiperSlide();

	return (
		<div
			className={classNames(
				'relative grid h-full grid-cols-12 gap-x-6 rounded border border-slate-300 bg-white',
				'before:absolute before:inset-y-0 before:z-10 before:block before:h-full before:w-full before:rounded before:bg-black before:transition-[opacity] before:duration-300 before:ease-in-out',
				swiperSlide.isNext || swiperSlide.isPrev ? 'before:opacity-80' : 'before:opacity-0'
			)}
		>
			<div className="col-span-12 block h-64 swiper-md:hidden">
				<img
					src={backgroundImage}
					alt=""
					className="h-auto max-h-full min-h-full w-auto min-w-full max-w-full bg-no-repeat object-cover object-center"
				/>
			</div>
			<ProjectSectionText title={title} totalShipment={totalShipment} description={description}></ProjectSectionText>
			<ProjectSectionGallery images={images}></ProjectSectionGallery>
		</div>
	);
}

export default ProjectSectionContent;
