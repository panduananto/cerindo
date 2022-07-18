import React from 'react';

import { HiOutlineTruck } from 'react-icons/hi';

function ProjectSectionText({ title, totalShipment, description }) {
	return (
		<div className="col-span-12 row-start-2 space-y-4 divide-y divide-slate-200 p-4 text-center swiper-md:col-span-5 swiper-md:row-start-1 swiper-md:py-6 swiper-md:pr-0 swiper-md:pl-6 swiper-md:text-left">
			<div className="text-slate-900">
				<h3 className="font-rubik text-lg font-bold swiper-md:text-2xl">{title}</h3>
				<div className="mt-1 flex items-center justify-center space-x-1 swiper-md:justify-start">
					<HiOutlineTruck className="h-7 w-7 text-red-600"></HiOutlineTruck>
					<p className="text-sm font-medium text-slate-500">
						<span className="font-bold text-red-600">
							{Intl.NumberFormat('en-US', {
								notation: 'compact',
								maximumFractionDigits: 1,
							}).format(totalShipment)}
						</span>{' '}
						shipment succesfully processed
					</p>
				</div>
			</div>
			<p className="pt-4 text-sm swiper-md:text-base">{description}</p>
		</div>
	);
}

export default ProjectSectionText;
