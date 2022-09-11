import React from 'react';

import { Disclosure } from '@headlessui/react';
import { HiChevronDown } from 'react-icons/hi';

function AklTable({ items, aklCollection, setItems, setAklCollection }) {
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
							className="sticky inset-x-0 top-0 z-10 hidden whitespace-nowrap bg-slate-100 px-6 py-3 text-left text-[13px] font-semibold text-slate-700 before:absolute before:left-0 before:top-0 before:w-full before:border-t before:border-slate-300 before:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:border-b after:border-slate-300 after:content-[''] 2md:table-cell"
						>
							Tipe
						</th>
						<th
							scope="col"
							className="sticky inset-x-0 top-0 z-10 whitespace-nowrap bg-slate-100 px-6 py-3 text-left text-[13px] font-semibold text-slate-700 before:absolute before:left-0 before:top-0 before:w-full before:border-t before:border-slate-300 before:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:border-b after:border-slate-300 after:content-['']"
						>
							Deskripsi
						</th>
						<th
							scope="col"
							className="sticky inset-x-0 top-0 z-10 hidden whitespace-nowrap bg-slate-100 px-6 py-3 text-left text-[13px] font-semibold text-slate-700 before:absolute before:left-0 before:top-0 before:w-full before:border-t before:border-slate-300 before:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:border-b after:border-slate-300 after:content-[''] lg:table-cell"
						>
							Negara
						</th>
						<th
							scope="col"
							className="sticky inset-x-0 top-0 z-10 whitespace-nowrap bg-slate-100 px-6 py-3 text-left text-[13px] font-semibold text-slate-700 before:absolute before:left-0 before:top-0 before:w-full before:border-t before:border-slate-300 before:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:border-b after:border-slate-300 after:content-['']"
						>
							Status
						</th>
						<th
							scope="col"
							className="sticky inset-x-0 top-0 z-10 whitespace-nowrap bg-slate-100 px-6 py-3 text-left text-[13px] font-semibold text-slate-700 before:absolute before:left-0 before:top-0 before:w-full before:border-t before:border-slate-300 before:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:border-b after:border-slate-300 after:content-['']"
						>
							Details
						</th>
					</tr>
				</thead>
				{items.length !== 0 ? (
					<tbody className="w-full divide-y divide-slate-200 overflow-y-auto">
						{items.map((item, index) => {
							return (
								<Disclosure as={React.Fragment} key={item.id + index}>
									{({ open }) => (
										<React.Fragment>
											<tr>
												<td className="hidden whitespace-nowrap px-6 py-4 text-left text-sm uppercase tracking-normal text-slate-700 2md:table-cell">
													{item.type}
												</td>
												<td className="max-w-[270px] truncate px-6 py-4 text-left text-sm uppercase tracking-normal text-slate-700">
													{item.name}
												</td>
												<td className="hidden whitespace-nowrap px-6 py-4 text-left text-sm tracking-normal text-slate-700 lg:table-cell">
													{item.country.name} &#40;{item.country.code}&#41;
												</td>
												<td className="whitespace-nowrap px-6 py-4 text-left text-sm tracking-normal">
													{new Date() > new Date(item.akl.expiry_date) ? (
														<span className="rounded-full bg-red-100 px-2 py-1 font-medium text-red-600">
															Kadaluarsa
														</span>
													) : (
														<span className="rounded-full bg-green-100 px-3 py-1 font-medium text-green-600">
															Aktif
														</span>
													)}
												</td>
												<td className="flex items-center justify-start whitespace-nowrap px-6 py-4 text-left text-sm uppercase tracking-normal text-slate-700">
													<Disclosure.Button className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white py-1 px-2 text-slate-500 transition-colors duration-150 ease-in-out hover:bg-slate-100 hover:text-slate-600 focus:bg-slate-100 focus:outline-none focus:ring-0">
														<HiChevronDown
															className={`${
																open && 'rotate-180 transform'
															} h-5 w-5 transition-transform duration-200 ease-in-out`}
														/>
													</Disclosure.Button>
												</td>
											</tr>
											<Disclosure.Panel as="tr">
												<td colSpan="5">
													<div className="grid grid-cols-12 gap-x-4 gap-y-4 px-6 py-8">
														<div className="col-span-12 space-y-4 xl:col-span-6">
															<div className="grid grid-cols-4 gap-x-4 gap-y-4">
																<div className="col-span-4 rounded border border-slate-300 px-2.5 py-2 shadow sm:col-span-2">
																	<p className="text-left text-sm font-semibold leading-[18px] tracking-normal text-slate-700">
																		Kode AKL
																	</p>
																	<p className="mt-1 text-sm text-slate-700">
																		{item.akl.id.split('_').join(' ')}
																	</p>
																</div>
																<div className="col-span-4 rounded border border-slate-300 px-2.5 py-2 shadow sm:col-span-1">
																	<p className="text-left text-sm font-semibold leading-[18px] tracking-normal text-slate-700">
																		Tipe
																	</p>
																	<p className="mt-1 text-sm text-slate-700">{item.type}</p>
																</div>
																<div className="col-span-4 rounded border border-slate-300 px-2.5 py-2 shadow sm:col-span-1">
																	<p className="text-left text-sm font-semibold leading-[18px] tracking-normal text-slate-700">
																		HS Code
																	</p>
																	<p className="mt-1 text-sm text-slate-700">{item.hscode.code}</p>
																</div>
															</div>
															<div className="grid grid-cols-2 gap-x-4 gap-y-4">
																<div className="col-span-2 rounded border border-slate-300 px-2.5 py-2 shadow sm:col-span-1">
																	<p className="text-left text-sm font-semibold leading-[18px] tracking-normal text-slate-700">
																		Merek
																	</p>
																	<p className="mt-1 truncate text-sm text-slate-700">
																		{item.akl.brand_name}
																	</p>
																</div>
																<div className="col-span-2 rounded border border-slate-300 px-2.5 py-2 shadow sm:col-span-1">
																	<p className="text-left text-sm font-semibold leading-[18px] tracking-normal text-slate-700">
																		Kemasan
																	</p>
																	<p className="mt-1 truncate text-sm text-slate-700">
																		{item.akl.packaging}
																	</p>
																</div>
															</div>
															<div className="rounded border border-slate-300 px-2.5 py-2 shadow">
																<p className="text-left text-sm font-semibold leading-[18px] tracking-normal text-slate-700">
																	Deskripsi
																</p>
																<p className="mt-1 truncate text-sm text-slate-700">{item.name}</p>
															</div>
															<div className="grid grid-cols-3 gap-x-4 gap-y-4">
																<div className="col-span-3 rounded border border-slate-300 px-2.5 py-2 shadow sm:col-span-1">
																	<p className="text-left text-sm font-semibold leading-[18px] tracking-normal text-slate-700">
																		Negara asal
																	</p>
																	<p className="mt-1 text-sm text-slate-700">{item.country.name}</p>
																</div>
																<div className="col-span-3 rounded border border-slate-300 px-2.5 py-2 shadow sm:col-span-1">
																	<p className="text-left text-sm font-semibold leading-[18px] tracking-normal text-slate-700">
																		Kode negara asal
																	</p>
																	<p className="mt-1 text-sm text-slate-700">{item.country.code}</p>
																</div>
																<div className="col-span-3 rounded border border-slate-300 px-2.5 py-2 shadow sm:col-span-1">
																	<p className="text-left text-sm font-semibold leading-[18px] tracking-normal text-slate-700">
																		Lartas
																	</p>
																	<p className="mt-1 text-sm text-slate-700">
																		{item.hscode.lartas}
																	</p>
																</div>
															</div>
														</div>
														<div className="col-span-12 space-y-4 xl:col-span-3">
															<div className="rounded border border-slate-300 px-2.5 py-2 shadow">
																<p className="text-left text-sm font-semibold leading-[18px] tracking-normal text-slate-700">
																	Biaya masuk
																</p>
																<p className="relative mt-1 text-sm text-slate-700">
																	{item.hscode.import_dutyfees}
																	<span className="absolute right-0 text-slate-400">&#37;</span>
																</p>
															</div>
															<div className="rounded border border-slate-300 px-2.5 py-2 shadow">
																<p className="text-left text-sm font-semibold leading-[18px] tracking-normal text-slate-700">
																	PPN
																</p>
																<p className="relative mt-1 text-sm text-slate-700">
																	{item.hscode.value_added_tax}
																	<span className="absolute right-0 text-slate-400">&#37;</span>
																</p>
															</div>
															<div className="rounded border border-slate-300 px-2.5 py-2 shadow">
																<p className="text-left text-sm font-semibold leading-[18px] tracking-normal text-slate-700">
																	PPH &#40;API&#41;
																</p>
																<p className="relative mt-1 text-sm text-slate-700">
																	{item.hscode.income_tax_api}{' '}
																	<span className="absolute right-0 text-slate-400">&#37;</span>
																</p>
															</div>
															<div className="rounded border border-slate-300 px-2.5 py-2 shadow">
																<p className="text-left text-sm font-semibold leading-[18px] tracking-normal text-slate-700">
																	PPH &#40;Non-API&#41;
																</p>
																<p className="relative mt-1 block text-sm text-slate-700">
																	{item.hscode.income_tax_non_api}
																	<span className="absolute right-0 text-slate-400">&#37;</span>
																</p>
															</div>
														</div>
														<div className="col-span-12 space-y-4 xl:col-span-3">
															<div className="rounded border border-slate-300 px-2.5 py-2 shadow">
																<p className="text-left text-sm font-semibold leading-[18px] tracking-normal text-slate-700">
																	Tanggal AKL
																</p>
																<p className="mt-1 text-sm text-slate-700">
																	{new Date(item.akl.date).toLocaleDateString('id')}
																</p>
															</div>
															<div className="rounded border border-slate-300 px-2.5 py-2 shadow">
																<p className="text-left text-sm font-semibold leading-[18px] tracking-normal text-slate-700">
																	Tanggal kadaluarsa AKL
																</p>
																<p className="mt-1 text-sm text-slate-700">
																	{new Date(item.akl.expiry_date).toLocaleDateString('id')}
																</p>
															</div>
														</div>
													</div>
													<div className="flex flex-row border-t border-slate-300 px-6 py-4 shadow-lg">
														<button
															className="inline-flex items-center justify-center rounded bg-white p-2 px-4 text-sm font-medium text-red-600 transition-colors duration-150 ease-in-out hover:bg-red-200/70 focus:bg-red-200/70 focus:outline-none focus:ring-0"
															onClick={() => handleDeleteItemAndAkl(item.id, item.akl.id)}
														>
															Delete
														</button>
													</div>
												</td>
											</Disclosure.Panel>
										</React.Fragment>
									)}
								</Disclosure>
							);
						})}
					</tbody>
				) : (
					<tbody>
						<tr>
							<td colSpan="5">
								<div className="m-6 rounded border-2 border-dashed border-slate-300 py-4 text-center">
									<p className="font-medium">Anda belum memilih izin AKL</p>
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
