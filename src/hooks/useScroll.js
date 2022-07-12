// https://dev.to/link2twenty/comment/1g231

import { useEffect, useState } from 'react';

const useScroll = () => {
	const [data, setData] = useState({
		x: 0,
		y: 0,
		lastX: 0,
		lastY: 0,
	});

	useEffect(() => {
		const handleScroll = () => {
			setData((last) => {
				return {
					x: window.scrollX,
					y: window.scrollY,
					lastX: last.x,
					lastY: last.y,
				};
			});
		};

		handleScroll();
		window.addEventListener('scroll', handleScroll);

		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	}, []);

	return data;
};

export default useScroll;
