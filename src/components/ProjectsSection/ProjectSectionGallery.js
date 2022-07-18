import React, { useState } from 'react';

import classNames from '../../utils/classNames';

function ProjectSectionGallery({ images }) {
	const [currentImage, setCurrentImage] = useState(images[0].src);

	return (
		<div className="col-span-12 row-start-1 hidden grid-cols-6 gap-x-2 px-6 pt-6 pb-0 sm:grid swiper-md:col-span-7 swiper-md:gap-x-0 swiper-md:py-6 swiper-md:pl-0">
			<img
				src={currentImage}
				className="col-span-4 h-72 w-full rounded bg-no-repeat object-cover object-center swiper-md:col-span-6"
				alt="project section big gallery"
			/>
			<div className="col-span-2 mt-0 grid h-72 grid-cols-6 gap-y-2 gap-x-0 swiper-md:col-span-6 swiper-md:mt-2 swiper-md:h-20 swiper-md:gap-y-0 swiper-md:gap-x-2">
				{images.map((image) => (
					<div
						key={image.src.split('/')[2].split('.')[0]}
						role="button"
						className={classNames(
							'relative col-span-6 h-auto max-h-full min-h-full w-auto min-w-full max-w-full overflow-hidden rounded swiper-md:col-span-2',
							'after:absolute after:inset-y-0 after:z-10 after:block after:h-full after:w-full after:bg-black after:transition-[opacity]',
							'hover:after:opacity-0',
							currentImage === image.src ? 'after:opacity-0' : 'after:opacity-70'
						)}
						onClick={() => setCurrentImage(image.src)}
					>
						<img
							src={image.src}
							className="h-full w-full bg-no-repeat object-cover object-center"
							alt="project section selection"
						/>
					</div>
				))}
			</div>
		</div>
	);
}

export default ProjectSectionGallery;
