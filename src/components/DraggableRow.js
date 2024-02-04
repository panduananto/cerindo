import React from 'react'

import { Disclosure } from '@headlessui/react'
import { useDrag, useDrop } from 'react-dnd'
import { HiCheckCircle, HiChevronDown, HiExclamationCircle, HiOutlineMenuAlt4 } from 'react-icons/hi'
import { useDispatch, useSelector } from 'react-redux'

import { aklDeleted, aklIdsReorder, selectAklsCollectionById } from '../features/akl/collection/aklCollectionSlice'

function DraggableRow({ id }) {
	const dispatch = useDispatch()

	const akl = useSelector((state) => selectAklsCollectionById(state, id))

	const [, dropRef] = useDrop({
		accept: 'id',
		drop: (draggedRow) => dispatch(aklIdsReorder(draggedRow, id)),
	})

	const [{ isDragging }, dragRef, previewRef] = useDrag({
		collect: (monitor) => ({
			isDragging: monitor.isDragging(),
		}),
		item: { id },
		type: 'id',
	})

	const handleDeleteItem = (id) => {
		dispatch(aklDeleted(id))
	}

	return (
		<Disclosure as={React.Fragment}>
			{({ open }) => (
				<React.Fragment>
					<tr ref={previewRef} className={isDragging ? 'opacity-50' : 'opacity-100'}>
						<td
							ref={dropRef}
							className="whitespace-nowrap py-3 pl-4 text-left text-sm uppercase tracking-normal text-slate-700"
						>
							<button ref={dragRef}>
								<HiOutlineMenuAlt4 />
							</button>
						</td>
						<td className="hidden whitespace-nowrap py-3 pr-4 text-left text-sm uppercase tracking-normal text-slate-700 2md:table-cell">
							<span>{akl.type}</span>
						</td>
						<td className="max-w-[270px] truncate px-4 py-3 text-left text-sm uppercase tracking-normal text-slate-700">
							<span>{akl.name}</span>
						</td>
						<td className="hidden whitespace-nowrap px-4 py-3 text-left text-sm tracking-normal text-slate-700 lg:table-cell">
							{akl.country.name} &#40;{akl.country.code}&#41;
						</td>
						<td className="whitespace-nowrap px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider">
							{new Date() > new Date(akl.akl.expiry_date) ? (
								<div className="inline-flex flex-row items-center gap-x-0.5 rounded-full bg-red-100 px-2 py-0.5 text-red-600">
									<HiExclamationCircle className="h-4 w-4" />
									<span>Kadaluarsa</span>
								</div>
							) : (
								<span className="inline-flex flex-row items-center gap-x-0.5 rounded-full bg-green-100 px-2 py-0.5 text-green-600">
									<HiCheckCircle className="h-4 w-4" />
									<span>Aktif</span>
								</span>
							)}
						</td>
						<td className="flex items-center justify-start whitespace-nowrap px-4 py-3 text-left text-sm uppercase tracking-normal text-slate-700">
							<Disclosure.Button className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-2 py-1 text-slate-500 transition-colors duration-150 ease-in-out hover:bg-slate-100 hover:text-slate-600 focus:bg-slate-100 focus:outline-none focus:ring-0">
								<HiChevronDown
									className={`${open && 'rotate-180 transform'} h-5 w-5 transition-transform duration-200 ease-in-out`}
								/>
							</Disclosure.Button>
						</td>
					</tr>
					<Disclosure.Panel as="tr">
						<td colSpan="6">
							<div className="grid grid-cols-12 gap-x-4 gap-y-4 px-6 py-8">
								<div className="col-span-12 space-y-4 xl:col-span-6">
									<div className="grid grid-cols-4 gap-x-4 gap-y-4">
										<div className="col-span-4 rounded border border-slate-300 px-2.5 py-2 shadow sm:col-span-2">
											<p className="text-left text-sm font-semibold leading-[18px] tracking-normal text-slate-700">
												Kode AKL
											</p>
											<p className="mt-1 text-sm text-slate-700">{akl.akl.id.split('_').join(' ')}</p>
										</div>
										<div className="col-span-4 rounded border border-slate-300 px-2.5 py-2 shadow sm:col-span-1">
											<p className="text-left text-sm font-semibold leading-[18px] tracking-normal text-slate-700">
												Tipe
											</p>
											<p className="mt-1 text-sm text-slate-700">{akl.type}</p>
										</div>
										<div className="col-span-4 rounded border border-slate-300 px-2.5 py-2 shadow sm:col-span-1">
											<p className="text-left text-sm font-semibold leading-[18px] tracking-normal text-slate-700">
												HS Code
											</p>
											<p className="mt-1 text-sm text-slate-700">{akl.hscode.code}</p>
										</div>
									</div>
									<div className="grid grid-cols-2 gap-x-4 gap-y-4">
										<div className="col-span-2 rounded border border-slate-300 px-2.5 py-2 shadow sm:col-span-1">
											<p className="text-left text-sm font-semibold leading-[18px] tracking-normal text-slate-700">
												Merek
											</p>
											<p className="mt-1 truncate text-sm text-slate-700">{akl.akl.brand_name}</p>
										</div>
										<div className="col-span-2 rounded border border-slate-300 px-2.5 py-2 shadow sm:col-span-1">
											<p className="text-left text-sm font-semibold leading-[18px] tracking-normal text-slate-700">
												Kemasan
											</p>
											<p className="mt-1 truncate text-sm text-slate-700">{akl.akl.packaging}</p>
										</div>
									</div>
									<div className="grid grid-cols-2 gap-x-4 gap-y-4">
										<div className="col-span-2 rounded border border-slate-300 px-2.5 py-2 shadow sm:col-span-1">
											<p className="text-left text-sm font-semibold leading-[18px] tracking-normal text-slate-700">
												Negara asal
											</p>
											<p className="mt-1 text-sm text-slate-700">{akl.country.name}</p>
										</div>
										<div className="col-span-2 rounded border border-slate-300 px-2.5 py-2 shadow sm:col-span-1">
											<p className="text-left text-sm font-semibold leading-[18px] tracking-normal text-slate-700">
												Kode negara asal
											</p>
											<p className="mt-1 text-sm text-slate-700">{akl.country.code}</p>
										</div>
									</div>
									<div className="rounded border border-slate-300 px-2.5 py-2 shadow">
										<p className="text-left text-sm font-semibold leading-[18px] tracking-normal text-slate-700">
											Deskripsi
										</p>
										<p className="mt-1 truncate text-sm text-slate-700">{akl.name !== null ? akl.name : '-'}</p>
									</div>
								</div>
								<div className="col-span-12 space-y-4 xl:col-span-3">
									<div className="rounded border border-slate-300 px-2.5 py-2 shadow">
										<p className="text-left text-sm font-semibold leading-[18px] tracking-normal text-slate-700">
											Biaya masuk
										</p>
										<p className="relative mt-1 text-sm text-slate-700">
											{akl.hscode.import_dutyfees}
											<span className="absolute right-0 text-slate-400">&#37;</span>
										</p>
									</div>
									<div className="rounded border border-slate-300 px-2.5 py-2 shadow">
										<p className="text-left text-sm font-semibold leading-[18px] tracking-normal text-slate-700">PPN</p>
										<p className="relative mt-1 text-sm text-slate-700">
											{akl.hscode.value_added_tax}
											<span className="absolute right-0 text-slate-400">&#37;</span>
										</p>
									</div>
									<div className="rounded border border-slate-300 px-2.5 py-2 shadow">
										<p className="text-left text-sm font-semibold leading-[18px] tracking-normal text-slate-700">
											PPH &#40;API&#41;
										</p>
										<p className="relative mt-1 text-sm text-slate-700">
											{akl.hscode.income_tax_api} <span className="absolute right-0 text-slate-400">&#37;</span>
										</p>
									</div>
									<div className="rounded border border-slate-300 px-2.5 py-2 shadow">
										<p className="text-left text-sm font-semibold leading-[18px] tracking-normal text-slate-700">
											PPH &#40;Non-API&#41;
										</p>
										<p className="relative mt-1 block text-sm text-slate-700">
											{akl.hscode.income_tax_non_api}
											<span className="absolute right-0 text-slate-400">&#37;</span>
										</p>
									</div>
								</div>
								<div className="col-span-12 space-y-4 xl:col-span-3">
									<div className="rounded border border-slate-300 px-2.5 py-2 shadow">
										<p className="text-left text-sm font-semibold leading-[18px] tracking-normal text-slate-700">
											Tanggal AKL
										</p>
										<p className="mt-1 text-sm text-slate-700">{new Date(akl.akl.date).toLocaleDateString('id')}</p>
									</div>
									<div className="rounded border border-slate-300 px-2.5 py-2 shadow">
										<p className="text-left text-sm font-semibold leading-[18px] tracking-normal text-slate-700">
											Tanggal kadaluarsa AKL
										</p>
										<p className="mt-1 text-sm text-slate-700">
											{new Date(akl.akl.expiry_date).toLocaleDateString('id')}
										</p>
									</div>
									<div className="rounded border border-slate-300 px-2.5 py-2 shadow">
										<p className="text-left text-sm font-semibold leading-[18px] tracking-normal text-slate-700">
											Fasilitas
										</p>
										<p className="mt-1 text-sm text-slate-700">{akl.facility !== null ? akl.facility : '-'}</p>
									</div>
									<div className="rounded border border-slate-300 px-2.5 py-2 shadow">
										<p className="text-left text-sm font-semibold leading-[18px] tracking-normal text-slate-700">
											Lartas
										</p>
										<p className="mt-1 text-sm text-slate-700">
											{akl.hscode.lartas !== null ? akl.hscode.lartas : '-'}
										</p>
									</div>
								</div>
							</div>
							<div className="flex flex-row border-t border-slate-300 px-6 py-4 shadow-lg">
								<button
									className="inline-flex items-center justify-center rounded bg-white p-2 px-4 text-sm font-medium text-red-600 transition-colors duration-150 ease-in-out hover:bg-red-200/70 focus:bg-red-200/70 focus:outline-none focus:ring-0"
									onClick={() => handleDeleteItem(id)}
								>
									Delete
								</button>
							</div>
						</td>
					</Disclosure.Panel>
				</React.Fragment>
			)}
		</Disclosure>
	)
}

export default DraggableRow
