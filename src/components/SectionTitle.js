import React from 'react';

function SectionTitle({ title, subTitle }) {
	return (
		<div className="text-center">
			<h1 className="font-rubik text-xl font-extrabold text-slate-900 md:text-2xl">{title}</h1>
			<p className="mt-2 text-sm text-slate-700 md:text-base">{subTitle}</p>
		</div>
	);
}

export default SectionTitle;
