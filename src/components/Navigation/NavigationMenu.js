import React from 'react';

import { useLocation } from 'react-router-dom';

import classNames from '../../utils/classNames';

function NavigationMenu({ items }) {
	const location = useLocation();

	return (
		<nav>
			<ul className="flex space-x-8">
				{items.map((item) => (
					<li key={`menu-item-${item.text}`}>
						<a
							href={`/${item.link}`}
							className={classNames(
								'block font-medium transition-colors duration-150 ease-in-out first-letter:uppercase hover:text-red-600',
								location.hash === item.link ? 'border-b-2 border-red-600 text-red-600' : 'text-slate-900'
							)}
						>
							{item.text}
						</a>
					</li>
				))}
			</ul>
		</nav>
	);
}

export default NavigationMenu;
