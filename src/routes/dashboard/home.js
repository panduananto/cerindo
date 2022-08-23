import React from 'react';

import { useOutletContext } from 'react-router-dom';

function HomeDashboard() {
	const [profile] = useOutletContext();

	return (
		<div className="h-[calc(100vh-65px)] w-full overflow-y-auto bg-slate-50">
			{profile?.first_name}
		</div>
	);
}

export default HomeDashboard;
