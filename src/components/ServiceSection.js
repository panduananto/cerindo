import React from 'react';

import { Tab } from '@headlessui/react';
import { HiStar } from 'react-icons/hi';

import classNames from '../utils/classNames';

import { services } from '../data';

function ServiceSection() {
	return (
		<div className="mt-6 grid w-full grid-cols-12 gap-4 md:mt-10">
			<Tab.Group>
				<div className="col-span-12 touch-pan-x select-none self-start overflow-x-auto bg-white px-2 pb-6 pt-2 transition-colors duration-150 ease-in-out scrollbar scrollbar-track-white scrollbar-thumb-slate-300 hover:scrollbar-thumb-slate-400 xl:col-span-3 xl:touch-none xl:overflow-visible xl:bg-transparent xl:p-0">
					<Tab.List className="float-left flex min-w-full space-x-2 space-y-0 xl:float-none xl:block xl:space-y-2 xl:space-x-0">
						{Object.keys(services).map((service) => (
							<Tab
								key={service}
								className={({ selected }) =>
									classNames(
										'w-full whitespace-nowrap rounded py-2.5 px-5 text-left text-sm font-semibold leading-5 text-white xl:py-4 xl:px-5',
										'transition-colors duration-150 ease-in-out focus:outline-none focus:ring-4 focus:ring-red-300',
										selected
											? 'bg-red-600 text-white'
											: 'text-slate-500 hover:bg-red-100 hover:text-red-600'
									)
								}
							>
								{service}
							</Tab>
						))}
					</Tab.List>
				</div>
				<Tab.Panels className="col-span-12 pt-0 xl:col-span-9">
					{Object.values(services).map((posts, index) => (
						<Tab.Panel key={`posts-${index}`}>
							{posts.map((post) => (
								<div key={`post-${post.id}`} className="grid grid-cols-8 overflow-hidden rounded">
									<img
										src={post.images}
										className="col-span-8 h-auto max-h-full min-h-full w-auto min-w-full max-w-full bg-no-repeat object-cover object-center md:col-span-4 md:h-full"
										alt={`${post.id}`}
									/>
									<div className="col-span-8 rounded-br rounded-bl border-l border-r border-b border-slate-300 bg-white py-4 px-4 text-sm text-slate-900 md:col-span-4 md:rounded-bl-none md:rounded-tr md:border-l-0 md:border-t md:px-6 md:py-8">
										<h3 className="font-rubik text-lg font-bold md:text-xl">{post.title}</h3>
										<p className="mt-2 !leading-7 md:mt-4 md:text-base">{post.description}</p>
										<ul className="mt-4 space-y-2 md:mt-6">
											{post.benefits.map((benefit) => (
												<li
													key={benefit.description}
													className="flex flex-row items-start space-x-3"
												>
													<HiStar className="h-5 w-5 flex-shrink-0 text-red-600 md:h-7 md:w-7"></HiStar>
													<p className="text-slate-600 md:text-base">{benefit.description}</p>
												</li>
											))}
										</ul>
									</div>
								</div>
							))}
						</Tab.Panel>
					))}
				</Tab.Panels>
			</Tab.Group>
		</div>
	);
}

export default ServiceSection;
