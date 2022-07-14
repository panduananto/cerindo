import React from 'react';

import { Tab } from '@headlessui/react';
import { HiStar } from 'react-icons/hi';

import { services } from '../data';
import classNames from '../utils/classNames';

function ServiceSection() {
	return (
		<div className="mt-6 grid w-full grid-cols-12 gap-4 md:mt-10">
			<Tab.Group>
				<Tab.List className="col-span-12 flex space-y-2 self-start overflow-x-auto xl:col-span-3 xl:block xl:overflow-x-visible">
					{Object.keys(services).map((service) => (
						<Tab
							key={service}
							className={({ selected }) =>
								classNames(
									classNames(
										'w-full whitespace-nowrap rounded py-4 px-5 text-left text-sm font-semibold leading-5 text-white',
										'focus:outline-none focus:ring-4 focus:ring-red-300',
										selected ? 'bg-red-600 text-white' : 'text-slate-500 hover:bg-slate-200 hover:text-slate-600'
									)
								)
							}
						>
							{service}
						</Tab>
					))}
				</Tab.List>
				<Tab.Panels className="col-span-12 xl:col-span-9">
					{Object.values(services).map((posts, index) => (
						<Tab.Panel key={`posts-${index}`}>
							{posts.map((post) => (
								<div key={`post-${post.id}`} className="grid grid-cols-8 overflow-hidden rounded shadow">
									<img
										src={post.images}
										className="col-span-8 h-64 w-full bg-no-repeat object-cover object-center md:col-span-4 md:h-full"
										alt={`${post.id}`}
									/>
									<div className="col-span-8 rounded-br rounded-bl border-l border-r border-b border-slate-300 bg-white py-4 px-4 text-slate-900 md:col-span-4 md:rounded-bl-none md:rounded-tr md:border-l-0 md:border-t md:px-6 md:py-8">
										<h3 className="font-rubik text-lg font-bold md:text-xl">{post.title}</h3>
										<p className="mt-2 text-justify text-sm md:mt-4 md:text-base">{post.description}</p>
										<ul className="mt-4 space-y-2 md:mt-6">
											{post.benefits.map((benefit) => (
												<li key={benefit.description} className="flex flex-row items-start space-x-3">
													<HiStar className="h-5 w-5 flex-shrink-0 text-red-600 md:h-7 md:w-7"></HiStar>
													<p className="text-sm text-slate-600 md:text-base">{benefit.description}</p>
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
