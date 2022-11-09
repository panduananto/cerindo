import React from 'react';

import { ToastContainer } from 'react-toastify';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import AklSearch from '../../components/Dashboard/Akl/AklSearch';
import AklTable from '../../components/Dashboard/Akl/AklTable';
import AklTableFooter from '../../components/Dashboard/Akl/AklTableFooter';

import 'react-toastify/dist/ReactToastify.css';

function AklLookup() {
	return (
		<React.Fragment>
			<ToastContainer
				bodyClassName="text-slate-900 font-inter font-medium text-sm"
				closeButton={false}
				position="top-right"
			/>
			<DndProvider backend={HTML5Backend}>
				<div className="relative flex h-[calc(100vh-65px)] w-full flex-auto flex-col overflow-y-auto bg-white">
					<AklSearch />
					<AklTable />
					<AklTableFooter />
				</div>
			</DndProvider>
		</React.Fragment>
	);
}

export default AklLookup;
