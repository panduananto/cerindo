import React from 'react';

import { Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

import { clients } from '../data';
import chunk from '../utils/chunk';

import 'swiper/css/bundle';

function ClientSection() {
	const clientsChunked = chunk(clients, 2);

	return (
		<div className="mt-6 w-full md:mt-10">
			<div className="hidden grid-cols-12 gap-y-7 gap-x-4 2md:grid">
				{clients.map((client) => (
					<div
						key={client.id}
						className="col-span-3 flex items-center justify-center rounded border border-slate-300/70 py-2 shadow-sm"
					>
						<img src={client.logo} className="inline h-[60px] max-w-[80%]" alt={`${client.id} logo`} />
					</div>
				))}
			</div>
			<Swiper
				className="block 2md:hidden"
				modules={[Autoplay]}
				slidesPerView="auto"
				grabCursor={true}
				speed={5000}
				spaceBetween={30}
				freeMode={true}
				loop={true}
				centeredSlides={true}
				autoplay={{ delay: 0, disableOnInteraction: false }}
			>
				{clientsChunked.map((clients, index) => (
					<SwiperSlide key={`swiper-slide-${index}`} className="!w-[131px] space-y-7">
						{clients.map((client) => (
							<div
								key={client.id}
								className="flex items-center justify-center rounded border border-slate-300/70 py-2 shadow-sm"
							>
								<img src={client.logo} className="inline h-[60px] max-w-[80%]" alt={`${client.id} logo`} />
							</div>
						))}
					</SwiperSlide>
				))}
			</Swiper>
		</div>
	);
}

export default ClientSection;
