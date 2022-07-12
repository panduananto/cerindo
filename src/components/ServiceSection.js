import React from 'react';

import { Tab } from '@headlessui/react';

import { services } from '../data';
import classNames from '../utils/classNames';

function ServiceSection() {
	return (
		<div className="mt-6 w-full md:mt-10">
			<Tab.Group>
				<Tab.List className="flex space-x-1 overflow-y-auto rounded bg-white p-1">
					{Object.keys(services).map((service) => (
						<Tab
							key={service}
							className={({ selected }) =>
								classNames(
									classNames(
										'w-full whitespace-nowrap rounded py-2.5 px-3 text-sm font-semibold leading-5 text-white',
										'ring-white ring-offset-2 ring-offset-red-600 focus:outline-none focus:ring-2',
										selected ? 'bg-red-100 text-red-600' : 'text-slate-400 hover:text-red-500'
									)
								)
							}
						>
							{service}
						</Tab>
					))}
				</Tab.List>
			</Tab.Group>
		</div>
	);
}

export default ServiceSection;
