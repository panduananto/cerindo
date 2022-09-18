import React, { useState, useCallback } from 'react';

import { ToastContainer } from 'react-toastify';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import AklSearch from '../../components/Dashboard/Akl/AklSearch';
import AklTable from '../../components/Dashboard/Akl/AklTable';
import AklTableFooter from '../../components/Dashboard/Akl/AklTableFooter';

import 'react-toastify/dist/ReactToastify.css';

function AklLookup() {
	const [items, setItems] = useState([]);
	const [aklCollection, setAklCollection] = useState([]);

	const findRowIndex = (arr, targetId) => {
		return arr.findIndex((a) => a.id === targetId);
	};

	const reorderRow = useCallback(
		(draggedRowId, targetRowId) => {
			const reorderedItems = [...items];

			const draggedRowIndex = findRowIndex(reorderedItems, draggedRowId);
			const targetRowIndex = findRowIndex(reorderedItems, targetRowId);

			reorderedItems.splice(targetRowIndex, 0, reorderedItems.splice(draggedRowIndex, 1)[0]);

			setItems([...reorderedItems]);
		},
		[items]
	);

	const resetTable = () => {
		setItems([]);
		setAklCollection([]);
	};

	return (
		<React.Fragment>
			<ToastContainer
				bodyClassName="text-slate-900 font-inter font-medium text-sm"
				closeButton={false}
				position="top-right"
			/>
			<DndProvider backend={HTML5Backend}>
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
						reorderRow={reorderRow}
					/>
					<AklTableFooter items={items} aklCollection={aklCollection} resetTable={resetTable} />
				</div>
			</DndProvider>
		</React.Fragment>
	);
}

export default AklLookup;
