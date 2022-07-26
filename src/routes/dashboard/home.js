import React from 'react';
import Tree from '../../components/Dashboard/Tree/Tree';

function HomeDashboard() {
	return (
		<div className="h-[calc(100vh-65px)] w-full overflow-y-auto bg-slate-50">
			<Tree></Tree>
		</div>
	);
}

export default HomeDashboard;
