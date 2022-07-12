import React from 'react';

import { Tab } from '@headlessui/react';
import { HiStar } from 'react-icons/hi';

import { services } from '../data';
import classNames from '../utils/classNames';

function ServiceSection() {
	return (
		<div className="mt-6 grid w-full grid-cols-12 gap-4 md:mt-10">
			<Tab.Group>
				<Tab.List className="col-span-3 space-y-2 self-start">
					{Object.keys(services).map((service) => (
						<Tab
							key={service}
							className={({ selected }) =>
								classNames(
									classNames(
										'w-full whitespace-nowrap rounded py-4 px-5 text-sm font-semibold leading-5 text-white',
										'focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-slate-50',
										selected ? 'bg-red-600 text-white' : 'text-slate-500 hover:bg-slate-200 hover:text-slate-600'
									)
								)
							}
						>
							{service}
						</Tab>
					))}
				</Tab.List>
				<Tab.Panels className="col-span-9">
					{Object.values(services).map((posts, index) => (
						<Tab.Panel key={`posts-${index}`}>
							{posts.map((post) => (
								<div key={`post-${post.id}`} className="space-y-4">
									<img
										src={post.images}
										className="h-96 w-full rounded bg-no-repeat object-cover object-center"
										alt={`${post.id}`}
									/>
									<h3 className="text-2xl font-bold text-slate-900">{post.title}</h3>
									<p className="text-justify text-lg font-light text-slate-700">{post.description}</p>
									<ul className="space-y-2">
										{post.benefits.map((benefit) => (
											<li className="flex flex-row items-center space-x-2">
												<HiStar className="h-6 w-6 text-orange-500"></HiStar>
												<p className="font-medium">{benefit.description}</p>
											</li>
										))}
									</ul>
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
