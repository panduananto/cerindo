'use client'

import React from 'react'

import { useAppSelector } from '@/lib/store/store'

import { Button } from './ui/button'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from './ui/collapsible'
import Icons from './ui/icons'

const AklTable = () => {
	const akl = useAppSelector((state) => state.akl)

	return (
		<div className="flex max-w-full flex-auto flex-col overflow-auto">
			<table className="relative min-w-full">
				<thead className="w-full shadow-sm">
					<tr>
						<th
							scope="col"
							className="sticky top-0 z-10 whitespace-nowrap bg-slate-100 py-3 pl-4 text-left text-[13px] font-semibold text-slate-700 before:absolute before:left-0 before:top-0 before:w-full before:border-t before:border-slate-300 before:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:border-b after:border-slate-300 after:content-['']"
						></th>
						<th
							scope="col"
							className="sticky top-0 z-10 hidden whitespace-nowrap bg-slate-100 py-3 pr-4 text-left text-[13px] font-semibold text-slate-700 before:absolute before:left-0 before:top-0 before:w-full before:border-t before:border-slate-300 before:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:border-b after:border-slate-300 after:content-[''] 2md:table-cell"
						>
							Tipe
						</th>
						<th
							scope="col"
							className="sticky top-0 z-10 whitespace-nowrap bg-slate-100 px-4 py-3 text-left text-[13px] font-semibold text-slate-700 before:absolute before:left-0 before:top-0 before:w-full before:border-t before:border-slate-300 before:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:border-b after:border-slate-300 after:content-['']"
						>
							Deskripsi
						</th>
						<th
							scope="col"
							className="sticky top-0 z-10 hidden whitespace-nowrap bg-slate-100 px-4 py-3 text-left text-[13px] font-semibold text-slate-700 before:absolute before:left-0 before:top-0 before:w-full before:border-t before:border-slate-300 before:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:border-b after:border-slate-300 after:content-[''] lg:table-cell"
						>
							Negara
						</th>
						<th
							scope="col"
							className="sticky top-0 z-10 whitespace-nowrap bg-slate-100 px-4 py-3 text-left text-[13px] font-semibold text-slate-700 before:absolute before:left-0 before:top-0 before:w-full before:border-t before:border-slate-300 before:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:border-b after:border-slate-300 after:content-['']"
						>
							Status
						</th>
						<th
							scope="col"
							className="sticky top-0 z-10 whitespace-nowrap bg-slate-100 px-4 py-3 text-left text-[13px] font-semibold text-slate-700 before:absolute before:left-0 before:top-0 before:w-full before:border-t before:border-slate-300 before:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:border-b after:border-slate-300 after:content-['']"
						>
							Details
						</th>
					</tr>
				</thead>
				{akl.length !== 0 ? (
					<tbody className="w-full divide-y divide-slate-200 overflow-y-auto">
						{akl.map((item) => {
							return (
								<Collapsible asChild>
									<React.Fragment>
										<tr>
											<td className="whitespace-nowrap pl-4 pr-3 text-left text-sm uppercase tracking-normal text-slate-700">
												<div className="flex items-center">
													<Button variant="ghost" size="icon">
														<Icons.gripVertical className="size-5" />
														<span className="sr-only">Drag to reorder</span>
													</Button>
												</div>
											</td>
											<td className="hidden whitespace-nowrap py-3 pr-4 text-left text-sm uppercase tracking-normal text-slate-700 2md:table-cell">
												<span>{item.type}</span>
											</td>
											<td className="max-w-[270px] truncate px-4 py-3 text-left text-sm uppercase tracking-normal text-slate-700">
												<span>{item.name}</span>
											</td>
											<td className="hidden whitespace-nowrap px-4 py-3 text-left text-sm tracking-normal text-slate-700 lg:table-cell">
												{item.countries.name} &#40;{item.countries.code}&#41;
											</td>
											<td className="whitespace-nowrap px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider">
												{new Date() > new Date(String(item.expiry_date)) ? (
													<div className="inline-flex flex-row items-center gap-x-1 rounded-full bg-red-100 px-2 py-0.5 text-red-600">
														<Icons.alertCircle strokeWidth={3} className="size-3" />
														<span>Kadaluarsa</span>
													</div>
												) : (
													<span className="inline-flex flex-row items-center gap-x-1 rounded-full bg-green-100 px-2 py-0.5 text-green-600">
														<Icons.checkCircle strokeWidth={3} className="size-3" />
														<span>Aktif</span>
													</span>
												)}
											</td>
											<td className="flex items-center justify-start whitespace-nowrap px-4 py-3 text-left text-sm uppercase tracking-normal text-slate-700">
												<CollapsibleTrigger asChild>
													<Button variant="ghost" size="icon" className="border border-slate-300 hover:bg-slate-100">
														<Icons.chevronDown className="size-5" />
														<span className="sr-only">Drag to reorder</span>
													</Button>
												</CollapsibleTrigger>
											</td>
										</tr>
										<CollapsibleContent asChild>
											<tr>
												<td colSpan={6}>
													<div className="grid grid-cols-12 gap-5 px-6 py-8">
														<div className="col-span-12 space-y-4 xl:col-span-6">
															<div className="grid grid-cols-4 gap-4">
																<div className="col-span-4 rounded border border-slate-300 px-2.5 py-2 shadow sm:col-span-2">
																	<p className="text-left text-sm font-semibold leading-[18px] tracking-normal text-slate-700">
																		Kode AKL
																	</p>
																	<p className="mt-1 text-sm text-slate-700">{item.id.split('_').join(' ')}</p>
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
															<div className="grid grid-cols-2 gap-4">
																<div className="col-span-2 rounded border border-slate-300 px-2.5 py-2 shadow sm:col-span-1">
																	<p className="text-left text-sm font-semibold leading-[18px] tracking-normal text-slate-700">
																		Merek
																	</p>
																	<p className="mt-1 truncate text-sm text-slate-700">{item.brand_name}</p>
																</div>
																<div className="col-span-2 rounded border border-slate-300 px-2.5 py-2 shadow sm:col-span-1">
																	<p className="text-left text-sm font-semibold leading-[18px] tracking-normal text-slate-700">
																		Kemasan
																	</p>
																	<p className="mt-1 truncate text-sm text-slate-700">{item.packaging}</p>
																</div>
															</div>
															<div className="grid grid-cols-2 gap-4">
																<div className="col-span-2 rounded border border-slate-300 px-2.5 py-2 shadow sm:col-span-1">
																	<p className="text-left text-sm font-semibold leading-[18px] tracking-normal text-slate-700">
																		Negara asal
																	</p>
																	<p className="mt-1 text-sm text-slate-700">{item.countries.name}</p>
																</div>
																<div className="col-span-2 rounded border border-slate-300 px-2.5 py-2 shadow sm:col-span-1">
																	<p className="text-left text-sm font-semibold leading-[18px] tracking-normal text-slate-700">
																		Kode negara asal
																	</p>
																	<p className="mt-1 text-sm text-slate-700">{item.countries.code}</p>
																</div>
															</div>
															<div className="rounded border border-slate-300 px-2.5 py-2 shadow">
																<p className="text-left text-sm font-semibold leading-[18px] tracking-normal text-slate-700">
																	Deskripsi
																</p>
																<p className="mt-1 truncate text-sm text-slate-700">
																	{item.name !== null ? item.name : '-'}
																</p>
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
																	{new Date(String(item.date)).toLocaleDateString('id')}
																</p>
															</div>
															<div className="rounded border border-slate-300 px-2.5 py-2 shadow">
																<p className="text-left text-sm font-semibold leading-[18px] tracking-normal text-slate-700">
																	Tanggal kadaluarsa AKL
																</p>
																<p className="mt-1 text-sm text-slate-700">
																	{new Date(String(item.expiry_date)).toLocaleDateString('id')}
																</p>
															</div>
															<div className="rounded border border-slate-300 px-2.5 py-2 shadow">
																<p className="text-left text-sm font-semibold leading-[18px] tracking-normal text-slate-700">
																	Fasilitas
																</p>
																<p className="mt-1 text-sm text-slate-700">
																	{item.facility !== null ? item.facility : '-'}
																</p>
															</div>
															<div className="rounded border border-slate-300 px-2.5 py-2 shadow">
																<p className="text-left text-sm font-semibold leading-[18px] tracking-normal text-slate-700">
																	Lartas
																</p>
																<p className="mt-1 text-sm text-slate-700">
																	{item.hscode.lartas !== null ? item.hscode.lartas : '-'}
																</p>
															</div>
														</div>
													</div>
													<div className="flex flex-row border-t border-slate-300 px-6 py-4 shadow-lg">
														<button className="inline-flex items-center justify-center rounded bg-white p-2 px-4 text-sm font-medium text-red-600 transition-colors duration-150 ease-in-out hover:bg-red-200/70 focus:bg-red-200/70 focus:outline-none focus:ring-0">
															Delete
														</button>
													</div>
												</td>
											</tr>
										</CollapsibleContent>
									</React.Fragment>
								</Collapsible>
							)
						})}
					</tbody>
				) : (
					<tbody>
						<tr>
							<td colSpan={6}>
								<div className="m-6 rounded border-2 border-dashed border-slate-300 py-4 text-center">
									<p className="text-sm font-medium">Anda belum memilih izin AKL</p>
								</div>
							</td>
						</tr>
					</tbody>
				)}
			</table>
		</div>
	)
}

export default AklTable
