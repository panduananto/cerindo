import React, { Fragment } from 'react';

function SectionTitle({ title, subTitle }) {
	return (
		<Fragment>
			<h1 className="font-rubik text-2xl font-extrabold text-slate-900">{title}</h1>
			<p className="text-base text-slate-700">{subTitle}</p>
		</Fragment>
	);
}

export default SectionTitle;
