import React from 'react';

import DraggableRow from '../../DraggableRow';

function AklTable({ items, aklCollection, setItems, setAklCollection, reorderRow }) {
	const handleDeleteItemAndAkl = (idItem, idAkl) => {
		const groupItemByAkl = items.reduce((acc, obj) => {
			if (obj.akl.id === idAkl) {
				return acc + 1;
			}

			return acc;
		}, 0);

		const updatedItems = items.filter((item) => item.id !== idItem);

		if (groupItemByAkl === 1) {
			const updatedAkl = aklCollection.filter((a) => a.id !== idAkl);

			setItems([...updatedItems]);
			setAklCollection([...updatedAkl]);
		} else {
			setItems([...updatedItems]);
		}
	};

	return (
		<div className="flex max-w-full flex-auto flex-col overflow-auto">
			<table className="relative min-w-full">
				<thead className="w-full shadow-sm">
					<tr>
						<th
							scope="col"
							className="sticky top-0 z-10 whitespace-nowrap bg-slate-100 py-3 pl-4 text-left text-[13px] font-semibold text-slate-700 before:absolute before:left-0 before:top-0 before:w-full before:border-t before:border-slate-300 before:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:border-b after:border-slate-300 after:content-['']"
						></th>
						<th
							scope="col"
							className="sticky top-0 z-10 hidden whitespace-nowrap bg-slate-100 py-3 pr-4 text-left text-[13px] font-semibold text-slate-700 before:absolute before:left-0 before:top-0 before:w-full before:border-t before:border-slate-300 before:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:border-b after:border-slate-300 after:content-[''] 2md:table-cell"
						>
							Tipe
						</th>
						<th
							scope="col"
							className="sticky top-0 z-10 whitespace-nowrap bg-slate-100 px-4 py-3 text-left text-[13px] font-semibold text-slate-700 before:absolute before:left-0 before:top-0 before:w-full before:border-t before:border-slate-300 before:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:border-b after:border-slate-300 after:content-['']"
						>
							Deskripsi
						</th>
						<th
							scope="col"
							className="sticky top-0 z-10 hidden whitespace-nowrap bg-slate-100 px-4 py-3 text-left text-[13px] font-semibold text-slate-700 before:absolute before:left-0 before:top-0 before:w-full before:border-t before:border-slate-300 before:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:border-b after:border-slate-300 after:content-[''] lg:table-cell"
						>
							Negara
						</th>
						<th
							scope="col"
							className="sticky top-0 z-10 whitespace-nowrap bg-slate-100 px-4 py-3 text-left text-[13px] font-semibold text-slate-700 before:absolute before:left-0 before:top-0 before:w-full before:border-t before:border-slate-300 before:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:border-b after:border-slate-300 after:content-['']"
						>
							Status
						</th>
						<th
							scope="col"
							className="sticky top-0 z-10 whitespace-nowrap bg-slate-100 px-4 py-3 text-left text-[13px] font-semibold text-slate-700 before:absolute before:left-0 before:top-0 before:w-full before:border-t before:border-slate-300 before:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:border-b after:border-slate-300 after:content-['']"
						>
							Details
						</th>
					</tr>
				</thead>
				{items.length !== 0 ? (
					<tbody className="w-full divide-y divide-slate-200 overflow-y-auto">
						{items.map((item, index) => {
							return (
								<DraggableRow
									key={item.id + index}
									row={item}
									reorderRow={reorderRow}
									handleDeleteItemAndAkl={handleDeleteItemAndAkl}
								></DraggableRow>
							);
						})}
					</tbody>
				) : (
					<tbody>
						<tr>
							<td colSpan="6">
								<div className="m-6 rounded border-2 border-dashed border-slate-300 py-4 text-center">
									<p className="text-sm font-medium">Anda belum memilih izin AKL</p>
								</div>
							</td>
						</tr>
					</tbody>
				)}
			</table>
		</div>
	);
}

export default AklTable;
