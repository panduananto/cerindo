import React from 'react';

function NavigationMenu({ items }) {
	return (
		<nav>
			<ul className="flex space-x-8">
				{items.map((item) => (
					<li key={`menu-item-${item.text}`}>
						<a href={item.link} className="block font-medium text-slate-900 first-letter:uppercase hover:text-red-600">
							{item.text}
						</a>
					</li>
				))}
			</ul>
		</nav>
	);
}

export default NavigationMenu;
