import React, { Fragment } from 'react';

import { clients } from '../data';

function ClientSection() {
	return (
		<Fragment>
			<div className="mt-6 grid grid-cols-12 gap-y-7 gap-x-4 md:mt-10">
				{clients.map((client) => (
					<div
						key={client.id}
						className="col-span-3 flex items-center justify-center rounded border border-slate-300/70 py-2 shadow-sm"
					>
						<img src={client.logo} className="inline h-[60px] max-w-[80%]" alt={`${client.id} logo`} />
					</div>
				))}
			</div>
		</Fragment>
	);
}

export default ClientSection;
