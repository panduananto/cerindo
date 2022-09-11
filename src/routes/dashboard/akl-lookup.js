import React, { useState } from 'react';

import { ToastContainer } from 'react-toastify';

import AklSearch from '../../components/Dashboard/Akl/AklSearch';
import AklTable from '../../components/Dashboard/Akl/AklTable';
import AklTableFooter from '../../components/Dashboard/Akl/AklTableFooter';

import 'react-toastify/dist/ReactToastify.css';

function AklLookup() {
	const [items, setItems] = useState([]);
	const [aklCollection, setAklCollection] = useState([]);

	return (
		<React.Fragment>
			<ToastContainer
				className="w-[22rem]"
				toastClassName="min-w-full"
				bodyClassName="text-slate-900 font-inter font-medium text-sm"
				closeButton={false}
				position="top-center"
			/>
			<div className="relative flex h-[calc(100vh-65px)] w-full flex-auto flex-col overflow-y-auto bg-white">
				<AklSearch
					items={items}
					aklCollection={aklCollection}
					setItems={setItems}
					setAklCollection={setAklCollection}
				/>
				<AklTable
					items={items}
					aklCollection={aklCollection}
					setItems={setItems}
					setAklCollection={setAklCollection}
				/>
				<AklTableFooter items={items} aklCollection={aklCollection} />
			</div>
		</React.Fragment>
	);
}

export default AklLookup;
