import React from 'react';

import { Link } from 'react-router-dom';

function Logo({ source, link }) {
	return (
		<Link to={link || '/'}>
			<img
				src={source || '/images/cerindo_logo.svg'}
				className="inline-block h-14 w-auto text-[#9d001b] sm:h-16"
				alt="Logo"
			/>
		</Link>
	);
}

export default Logo;
