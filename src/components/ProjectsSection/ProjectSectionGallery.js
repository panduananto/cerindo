import React, { useState } from 'react';

import classNames from '../../utils/classNames';

function ProjectSectionGallery({ images }) {
	const [currentImage, setCurrentImage] = useState(images[0].src);

	return (
		<div className="col-span-12 hidden py-6 pr-6 swiper-md:col-span-7 swiper-md:block">
			<img
				src={currentImage}
				className="h-72 w-full rounded bg-no-repeat object-cover object-center"
				alt="project section big gallery"
			/>
			<div className="mt-2 grid h-20 grid-cols-12 gap-x-2">
				{images.map((image) => (
					<div
						key={image.src.split('/')[2].split('.')[0]}
						role="button"
						className={classNames(
							'relative col-span-4 h-auto max-h-full min-h-full w-auto min-w-full max-w-full overflow-hidden rounded',
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
