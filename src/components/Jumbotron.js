import React from 'react';

import { IconContext } from 'react-icons/lib';
import { HiLocationMarker, HiPhone, HiMail, HiOutlineClock } from 'react-icons/hi';

export default function Jumbotron() {
	return (
		<div className="w-full">
			<header className="relative flex h-96 w-full items-center justify-start before:absolute before:inset-y-0 before:z-10 before:block before:h-full before:w-full before:bg-black/70 md:h-[512px]">
				<picture className="absolute z-0 h-full w-full">
					<img
						src="images/jumbotron_bg.jpg"
						className="h-full w-full bg-no-repeat object-cover object-center"
						alt="Jumbotron background"
					/>
				</picture>
				<div className="z-20 mx-auto flex h-full w-full max-w-6xl flex-col items-center justify-center py-7 px-4 text-white sm:px-6 md:items-start lg:px-8">
					<h1 className="font-rubik text-5xl font-bold md:text-7xl">Trusted!</h1>
					<p className="mt-2 text-3xl font-extralight tracking-tighter md:text-5xl">Done by experienced people.</p>
					<a
						href="/"
						role="button"
						className="mt-8 inline-flex items-center rounded bg-red-600 px-6 py-3 font-semibold text-white hover:bg-red-700 focus:outline-dashed focus:outline-2 focus:outline-offset-4 focus:outline-white"
					>
						<HiLocationMarker className="h-6 w-6"></HiLocationMarker>
						<span className="ml-2">Track now</span>
					</a>
				</div>
			</header>
			<aside className="bg-red-600 text-white">
				<div className="mx-auto flex max-w-6xl flex-col items-center justify-between space-y-4 divide-y divide-red-700/90 py-10 px-4 sm:px-6 lg:py-14 lg:px-8 2md:flex-row 2md:space-y-0 2md:divide-y-0">
					<IconContext.Provider value={{ className: 'w-7 2md:w-9 h-7 2md:h-9' }}>
						<div className="flex flex-col items-center space-y-2 space-x-0 py-4 lg:flex-row lg:space-y-0 lg:space-x-4 2md:items-start 2md:py-0">
							<HiPhone></HiPhone>
							<div className="space-y-2 text-center 2md:text-left">
								<p className="font-light">Have a question? Call us now.</p>
								<a
									href="tel:+62218629000"
									className="block rounded text-base font-medium hover:underline hover:decoration-2 hover:underline-offset-4 focus:outline-dashed focus:outline-2 focus:outline-offset-4 focus:outline-white 2md:text-lg"
								>
									+6221-862-9000
								</a>
							</div>
						</div>
						<div className="flex flex-col items-center space-y-2 space-x-0 py-4 lg:flex-row lg:space-y-0 lg:space-x-4 2md:items-start 2md:py-0">
							<HiOutlineClock></HiOutlineClock>
							<div className="space-y-2 text-center 2md:text-left">
								<p className="font-light">We are open at:</p>
								<span className="block text-lg font-medium">Monday-Friday, 08:30-17:30</span>
							</div>
						</div>
						<div className="flex flex-col items-center space-y-2 space-x-0 py-4 lg:flex-row lg:space-y-0 lg:space-x-4 2md:items-start 2md:py-0">
							<HiMail></HiMail>
							<div className="space-y-2 text-center 2md:text-left">
								<p className="font-light">Drop us an email here:</p>
								<a
									href="mailto:customerservice@cerindo.co.id"
									className="block rounded text-base font-medium hover:underline hover:decoration-2 hover:underline-offset-4 focus:outline-dashed focus:outline-2 focus:outline-offset-4 focus:outline-white 2md:text-lg"
								>
									customerservice@cerindo.co.id
								</a>
							</div>
						</div>
					</IconContext.Provider>
				</div>
			</aside>
		</div>
	);
}
