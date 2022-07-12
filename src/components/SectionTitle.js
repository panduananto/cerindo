import React from 'react';

function SectionTitle({ title, subTitle }) {
	return (
		<div className="text-center">
			<h1 className="font-rubik text-xl font-extrabold text-slate-900 sm:text-2xl md:text-3xl">{title}</h1>
			<p className="mt-2 text-sm font-light text-slate-700 sm:text-base md:text-lg">{subTitle}</p>
		</div>
	);
}

export default SectionTitle;
