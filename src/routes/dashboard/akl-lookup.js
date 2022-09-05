import React, { useEffect, useState } from 'react';

import JSZip from 'jszip';
import FileSaver from 'file-saver';

import { Disclosure, Popover, Transition } from '@headlessui/react';
import {
	HiSearch,
	HiX,
	HiChevronDown,
	HiCheckCircle,
	HiExclamation,
	HiExclamationCircle,
	HiDotsVertical,
} from 'react-icons/hi';
import { ToastContainer, toast } from 'react-toastify';
import { useDebounce } from 'use-debounce';
import { utils, writeFile } from 'xlsx';

import supabase from '../../supabase';

import 'react-toastify/dist/ReactToastify.css';

function AklLookup() {
	const [loading, setLoading] = useState(false);
	const [query, setQuery] = useState('');
	const [debouncedQuery] = useDebounce(query, 800);
	const [queryResult, setQueryResult] = useState(null);
	const [items, setItems] = useState([]);
	const [akl, setAkl] = useState([]);

	const handleClearQuery = () => {
		setQuery('');
	};

	const handleFetchAklFile = async (url) => {
		return await supabase.storage.from('cerindo').download(`akl/${url}`);
	};

	const handleSaveAkl = async (akl) => {
		const { data, error } = await handleFetchAklFile(akl.file_url);

		if (error) throw error;

		setAkl((prev) => [
			...prev,
			{
				id: akl.id,
				date: akl.date,
				expiry_date: akl.expiry_date,
				file: data,
			},
		]);
	};

	const handleSaveItemAndAkl = async (id) => {
		const target = queryResult.filter((item) => item.id === id);

		if (target === null) return null;

		setItems((prev) => [...prev, target[0]]);

		const { akl: aklTarget } = target[0];
		const aklCode = aklTarget.id.split('_').join(' ');
		const checkDuplicateAkl = akl.some((a) => a.id === aklTarget.id);

		if (!checkDuplicateAkl) {
			toast.promise(handleSaveAkl(aklTarget), {
				pending: {
					render() {
						return `Mengunduh ${aklCode}`;
					},
				},
				success: {
					render() {
						return `${aklCode} berhasil ditambahkan`;
					},
					icon: <HiCheckCircle className="h-5 w-5 text-green-600" />,
				},
				error: {
					renter() {
						return 'Maaf, ada kesalahan. Coba lagi.';
					},
				},
			});
		} else {
			toast.warn(`${aklCode} telah terdaftar`, {
				icon: <HiExclamation className="h-5 w-5 text-yellow-600" />,
			});
		}
	};

	const handleDownloadExcel = () => {
		const headerItems = [
			[
				'NEGARA ASAL',
				'MEREK',
				'NAMA DAGANG',
				'KEMASAN',
				'HS CODE',
				'BM',
				'PPN',
				'PPH-API',
				'PPH-NONAPI',
			],
		];
		const headerAKL = [['KODE AKL', 'TANGGAL TERBIT', 'TANGGAL KADALUARSA']];

		const workbook = utils.book_new();

		if (items.length === 0 || akl.length === 0) {
			toast.error('Barang atau AKL masih kosong', {
				icon: <HiExclamationCircle className="h-5 w-5 text-red-600" />,
			});

			return null;
		}

		const rowsItems = items.map((item) => ({
			countryCode: item.country.country_code,
			type: item.type,
			brandName: `KEMASAN : ${item.akl.brand_name}`,
			packaging: item.akl.packaging,
			hsCode: item.hscode.hs_code,
			importDutyFees: item.hscode.import_dutyfees,
			valueAddedTax: item.hscode.value_added_tax,
			incomeTaxApi: item.hscode.income_tax_api,
			incomeTaxNonApi: item.hscode.income_tax_non_api,
		}));

		const rowsAKL = akl.map((a) => {
			const dateOptions = { year: 'numeric', month: '2-digit', day: '2-digit' };

			return {
				aklCode: a.id.split('_').join(' '),
				date: new Date(a.date).toLocaleDateString('id', dateOptions),
				expiryDate: new Date(a.expiry_date).toLocaleDateString('id', dateOptions),
			};
		});

		const worksheetItems = utils.json_to_sheet(rowsItems);
		const worksheetAKL = utils.json_to_sheet(rowsAKL);

		utils.book_append_sheet(workbook, worksheetItems, 'BARANG');
		utils.book_append_sheet(workbook, worksheetAKL, 'AKL');

		utils.sheet_add_aoa(worksheetItems, headerItems, { origin: 'A1' });
		utils.sheet_add_aoa(worksheetAKL, headerAKL, { origin: 'A1' });

		writeFile(workbook, 'TABEL BARANG.xlsx');
	};

	const handleDownloadAKL = () => {
		if (akl.length === 0) {
			toast.error('AKL masih kosong', {
				icon: <HiExclamationCircle className="h-5 w-5 text-red-600" />,
			});

			return null;
		}

		const zip = new JSZip();

		akl.forEach((a) => {
			zip.file(`${a.id}.pdf`, a.file, { binary: true });
		});

		zip.generateAsync({ type: 'Blob' }).then((content) => {
			FileSaver.saveAs(content, 'AKL.zip');
		});
	};

	useEffect(() => {
		let isSubscribed = true;

		const fetchAKL = async (aklQuery) => {
			setLoading(true);

			if (isSubscribed && aklQuery !== '') {
				try {
					let { data: itemAKL, error: errorAKL } = await supabase
						.from('item_akl')
						.select(
							`id, type, name,
							akl:id_akl (id, brand_name, packaging, date, expiry_date, file_url),
							hscode:id_hscode (hs_code, import_dutyfees, value_added_tax, income_tax_api, income_tax_non_api, lartas),
							country:id_country (country_code, country)`
						)
						.eq('type', aklQuery);

					if (errorAKL) throw errorAKL;

					setQueryResult(itemAKL);
				} catch (error) {
					console.log(error); // TODO: show error message to user
				} finally {
					setLoading(false);
				}
			} else {
				setLoading(false);
				setQueryResult(null);
			}
		};

		fetchAKL(debouncedQuery);

		return () => (isSubscribed = false);
	}, [debouncedQuery]);

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
				<div className="bg-white px-8 py-8 text-slate-900 sm:px-10 lg:px-12">
					<h1 className="font-rubik text-3xl font-semibold leading-8">Pencarian AKL</h1>
					<p className="mt-1 text-sm font-medium text-slate-700">
						Cari dan tinjau izin AKL yang Anda butuhkan
					</p>
					<div className="relative mt-4 flex w-full flex-col">
						<label htmlFor="aklType" className="sr-only">
							Tipe AKL
						</label>
						<div className="relative">
							<div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
								<HiSearch className="h-5 w-5 text-slate-500" />
							</div>
							<input
								type="text"
								id="aklType"
								name="aklType"
								value={query}
								placeholder="Cari izin AKL berdasarkan tipe ART barang, ex: 4556666"
								className="block w-full rounded border border-slate-300 bg-white p-3 pl-10 text-sm text-slate-900 placeholder-slate-400 shadow-sm focus:border-red-600 focus:outline-none focus:ring-1 focus:ring-red-600"
								autoComplete="off"
								onChange={(event) => setQuery(event.target.value)}
							/>
							{query !== '' && (
								<div className="absolute inset-y-0 right-0 -mr-2 flex items-center pr-3">
									<button className="inline-flex items-center justify-center rounded bg-white p-2 text-slate-500">
										<HiX className="h-5 w-5" onClick={handleClearQuery} />
									</button>
								</div>
							)}
						</div>
						{loading ? (
							<div className="absolute top-[4.125rem] left-1/2 z-50 -translate-x-1/2 rounded border border-slate-200 bg-white py-4 px-4 shadow-lg">
								Sedang mencari izin AKL...
							</div>
						) : !loading && query !== '' && queryResult !== null ? (
							queryResult.length === 0 ? (
								<div className="absolute top-[4.125rem] left-1/2 z-50 -translate-x-1/2 rounded border border-slate-200 bg-white py-4 px-4 shadow-lg">
									Izin AKL yang Anda cari tidak ditemukan
								</div>
							) : (
								<ul className="absolute top-[4.125rem] z-50 flex w-full flex-col rounded border border-slate-200 bg-white py-4 shadow-xl">
									{queryResult.map((result) => {
										return (
											<li
												key={result.id}
												className="cursor-pointer px-4 py-2 hover:bg-slate-100"
												onClick={() => handleSaveItemAndAkl(result.id)}
											>
												<p className="font-bold">
													{result.akl.brand_name} / {result.name}
												</p>
												<p className="text-slate-700">
													{result.type} - {result.country.country}
												</p>
												<p className="mt-3 text-sm text-slate-700">
													<span className="font-semibold text-red-600">Expiry date:</span>{' '}
													{new Date(result.akl.expiry_date).toLocaleDateString()}
												</p>
											</li>
										);
									})}
								</ul>
							)
						) : null}
					</div>
				</div>
				<div className="max-h-96 max-w-full overflow-auto">
					<table className="relative min-w-full">
						<thead className="w-full shadow-sm">
							<tr>
								<th
									scope="col"
									className="sticky inset-x-0 top-0 z-40 hidden whitespace-nowrap bg-slate-100 px-6 py-3 text-left text-[13px] font-semibold text-slate-700 before:absolute before:left-0 before:top-0 before:w-full before:border-t before:border-slate-300 before:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:border-b after:border-slate-300 after:content-[''] 2md:table-cell"
								>
									Tipe
								</th>
								<th
									scope="col"
									className="sticky inset-x-0 top-0 z-40 whitespace-nowrap bg-slate-100 px-6 py-3 text-left text-[13px] font-semibold text-slate-700 before:absolute before:left-0 before:top-0 before:w-full before:border-t before:border-slate-300 before:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:border-b after:border-slate-300 after:content-['']"
								>
									Deskripsi
								</th>
								<th
									scope="col"
									className="sticky inset-x-0 top-0 z-40 hidden whitespace-nowrap bg-slate-100 px-6 py-3 text-left text-[13px] font-semibold text-slate-700 before:absolute before:left-0 before:top-0 before:w-full before:border-t before:border-slate-300 before:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:border-b after:border-slate-300 after:content-[''] lg:table-cell"
								>
									Negara
								</th>
								<th
									scope="col"
									className="sticky inset-x-0 top-0 z-40 whitespace-nowrap bg-slate-100 px-6 py-3 text-left text-[13px] font-semibold text-slate-700 before:absolute before:left-0 before:top-0 before:w-full before:border-t before:border-slate-300 before:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:border-b after:border-slate-300 after:content-['']"
								>
									Status
								</th>
								<th
									scope="col"
									className="sticky inset-x-0 top-0 z-40 whitespace-nowrap bg-slate-100 px-6 py-3 text-left text-[13px] font-semibold text-slate-700 before:absolute before:left-0 before:top-0 before:w-full before:border-t before:border-slate-300 before:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:border-b after:border-slate-300 after:content-['']"
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
															{item.country.country} &#40;{item.country.country_code}&#41;
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
																			<p className="mt-1 text-sm text-slate-700">
																				{item.hscode.hs_code}
																			</p>
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
																		<p className="mt-1 truncate text-sm text-slate-700">
																			{item.name}
																		</p>
																	</div>
																	<div className="grid grid-cols-3 gap-x-4 gap-y-4">
																		<div className="col-span-3 rounded border border-slate-300 px-2.5 py-2 shadow sm:col-span-1">
																			<p className="text-left text-sm font-semibold leading-[18px] tracking-normal text-slate-700">
																				Negara asal
																			</p>
																			<p className="mt-1 text-sm text-slate-700">
																				{item.country.country}
																			</p>
																		</div>
																		<div className="col-span-3 rounded border border-slate-300 px-2.5 py-2 shadow sm:col-span-1">
																			<p className="text-left text-sm font-semibold leading-[18px] tracking-normal text-slate-700">
																				Kode negara asal
																			</p>
																			<p className="mt-1 text-sm text-slate-700">
																				{item.country.country_code}
																			</p>
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
														</td>
													</Disclosure.Panel>
												</React.Fragment>
											)}
										</Disclosure>
									);
								})}
							</tbody>
						) : (
							<tbody className="w-full overflow-y-auto">
								<tr>
									<td colSpan="5">
										<div className="m-6 flex h-96 items-center justify-center rounded border-2 border-dashed border-slate-300 text-center">
											<p className="font-medium">Anda belum memilih izin AKL</p>
										</div>
									</td>
								</tr>
							</tbody>
						)}
					</table>
				</div>
				<div className="mt-auto flex items-center justify-between border-t border-slate-300 bg-white px-4 py-1 sm:px-6 lg:px-8 2md:py-3">
					<p className="text-[13px] text-slate-700">
						<span className="font-extrabold">{items.length}</span> barang dan{' '}
						<span className="font-extrabold">{akl.length}</span> izin AKL terpilih
					</p>
					<div className="block 2md:hidden">
						<Popover className="relative">
							<React.Fragment>
								<Popover.Button className="inline-flex items-center justify-center rounded bg-white p-2 text-slate-500 transition-colors duration-150 ease-in-out hover:bg-slate-100 hover:text-slate-600 focus:bg-slate-100 focus:outline-none focus:ring-0">
									<HiDotsVertical className="h-6 w-6" />
								</Popover.Button>
								<Transition
									as={React.Fragment}
									enter="transition ease-out duration-200"
									enterFrom="opacity-0 translate-y-1"
									enterTo="opacity-100 translate-y-0"
									leave="transition ease-in duration-150"
									leaveFrom="opacity-100 translate-y-0"
									leaveTo="opacity-0 translate-y-1"
								>
									<Popover.Panel className="absolute -left-[67px] bottom-10 z-10 mb-2 w-[215px] max-w-[240px] -translate-x-1/2 transform">
										<div className="overflow-hidden rounded border border-slate-200 shadow-lg">
											<div className="bg-white py-2 text-slate-700">
												<ul>
													<li>
														<button
															disabled={akl.length === 0 ? true : false}
															className="flex w-full items-center rounded px-4 py-2 text-sm font-medium leading-5 hover:enabled:bg-red-50 hover:enabled:text-red-600 disabled:cursor-not-allowed disabled:text-slate-300"
															onClick={() => handleDownloadAKL()}
														>
															Download AKL &#40;.zip&#41;
														</button>
													</li>
													<li>
														<button
															disabled={items.length === 0 ? true : false}
															className="flex w-full items-center rounded px-4 py-2 text-sm font-medium leading-5 hover:enabled:bg-red-50 hover:enabled:text-red-600 disabled:cursor-not-allowed disabled:text-slate-300"
															onClick={() => handleDownloadExcel()}
														>
															Download excel &#40;.xlsx&#41;
														</button>
													</li>
												</ul>
											</div>
										</div>
									</Popover.Panel>
								</Transition>
							</React.Fragment>
						</Popover>
					</div>
					<div className="hidden space-x-2 text-[13px] font-medium text-slate-700 2md:block">
						<button
							disabled={akl.length === 0 ? true : false}
							className="rounded border border-slate-300 px-2 py-1 hover:enabled:bg-slate-100 hover:enabled:text-red-600 disabled:cursor-not-allowed disabled:text-slate-300"
							onClick={() => handleDownloadAKL()}
						>
							Download AKL &#40;.zip&#41;
						</button>
						<button
							disabled={items.length === 0 ? true : false}
							className="rounded border border-slate-300 px-2 py-1 hover:enabled:bg-slate-100 hover:enabled:text-red-600 disabled:cursor-not-allowed disabled:text-slate-300"
							onClick={() => handleDownloadExcel()}
						>
							Download excel &#40;.xlsx&#41;
						</button>
					</div>
				</div>
			</div>
		</React.Fragment>
	);
}

export default AklLookup;
