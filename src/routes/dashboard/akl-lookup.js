import React, { useEffect, useState } from 'react';

import { HiSearch, HiX, HiChevronDown } from 'react-icons/hi';
import { useDebounce } from 'use-debounce';

import supabase from '../../supabase';

function AklLookup() {
	const [loading, setLoading] = useState(false);
	const [query, setQuery] = useState('');
	const [debouncedQuery] = useDebounce(query, 800);
	const [akl, setAkl] = useState([]);
	const [resultAkl, setResultAkl] = useState(null);

	const handleClearQuery = () => {
		setQuery('');
	};

	const handleAddAkl = (id) => {
		const target = resultAkl.filter((akl) => akl.id === id);

		if (target === null) return null;

		setAkl((prev) => [...prev, ...target]);
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
							akl:id_akl (brand_name, packaging, date, expiry_date),
							hscode:id_hscode (hs_code, import_dutyfees, value_added_tax, income_tax_api, income_tax_non_api, lartas),
							country:id_country (country_code, country)`
						)
						.eq('type', aklQuery);

					if (errorAKL) throw errorAKL;

					setResultAkl(itemAKL);
				} catch (error) {
					console.log(error); // TODO: show error message to user
				} finally {
					setLoading(false);
				}
			} else {
				setLoading(false);
				setResultAkl(null);
			}
		};

		fetchAKL(debouncedQuery);

		return () => (isSubscribed = false);
	}, [debouncedQuery]);

	return (
		<div className="relative flex h-[calc(100vh-65px)] w-full flex-auto flex-col overflow-y-auto bg-white">
			<div className="bg-white px-8 py-8 text-slate-900 sm:px-10 lg:px-12">
				<h1 className="font-rubik text-3xl font-semibold leading-8">Pencarian AKL</h1>
				<p className="mt-1 text-sm font-medium text-slate-700">
					Cari dan tinjau izin AKL yang Anda butuhkan
				</p>
				<div className="relative mt-4 flex w-full flex-col">
					<label htmlFor="aklType" className="sr-only">
						AKL type
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
					) : !loading && query !== '' && resultAkl !== null ? (
						resultAkl.length === 0 ? (
							<div className="absolute top-[4.125rem] left-1/2 z-50 -translate-x-1/2 rounded border border-slate-200 bg-white py-4 px-4 shadow-lg">
								Izin AKL yang Anda cari tidak ditemukan
							</div>
						) : (
							<ul className="absolute top-[4.125rem] z-50 flex w-full flex-col rounded border border-slate-200 bg-white py-4 shadow-xl">
								{resultAkl.map((result) => {
									return (
										<li
											key={result.id}
											className="cursor-pointer px-4 py-2 hover:bg-slate-100"
											onClick={() => handleAddAkl(result.id)}
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
				<table className="relative w-full">
					<thead className="w-full shadow-sm">
						<tr>
							<th
								scope="col"
								className="sticky inset-x-0 top-0 z-40 whitespace-nowrap bg-slate-100 px-6 py-3 text-left text-xs uppercase tracking-wider text-slate-700 before:absolute before:left-0 before:top-0 before:w-full before:border-t before:border-slate-200 before:content-[''] after:absolute after:left-0 after:top-0 after:w-full after:border-b after:border-slate-200 after:content-['']"
							>
								Tipe
							</th>
							<th
								scope="col"
								className="sticky inset-x-0 top-0 z-40 whitespace-nowrap bg-slate-100 px-6 py-3 text-left text-xs uppercase tracking-wider text-slate-700 before:absolute before:left-0 before:top-0 before:w-full before:border-t before:border-slate-200 before:content-[''] after:absolute after:left-0 after:top-0 after:w-full after:border-b after:border-slate-200 after:content-['']"
							>
								Deskripsi
							</th>
							<th
								scope="col"
								className="sticky inset-x-0 top-0 z-40 whitespace-nowrap bg-slate-100 px-6 py-3 text-left text-xs uppercase tracking-wider text-slate-700 before:absolute before:left-0 before:top-0 before:w-full before:border-t before:border-slate-200 before:content-[''] after:absolute after:left-0 after:top-0 after:w-full after:border-b after:border-slate-200 after:content-['']"
							>
								Negara
							</th>
							<th
								scope="col"
								className="sticky inset-x-0 top-0 z-40 whitespace-nowrap bg-slate-100 px-6 py-3 text-left text-xs uppercase tracking-wider text-slate-700 before:absolute before:left-0 before:top-0 before:w-full before:border-t before:border-slate-200 before:content-[''] after:absolute after:left-0 after:top-0 after:w-full after:border-b after:border-slate-200 after:content-['']"
							>
								Status
							</th>
							<th
								scope="col"
								className="sticky inset-x-0 top-0 z-40 whitespace-nowrap bg-slate-100 px-6 py-3 text-left text-xs uppercase tracking-wider text-slate-700 before:absolute before:left-0 before:top-0 before:w-full before:border-t before:border-slate-200 before:content-[''] after:absolute after:left-0 after:top-0 after:w-full after:border-b after:border-slate-200 after:content-['']"
							>
								Details
							</th>
						</tr>
					</thead>
					{akl.length !== 0 ? (
						<tbody className="w-full overflow-y-auto">
							{akl.map((item, index) => {
								return (
									<tr key={item.id + index} className="divide-y divide-slate-200">
										<td className="whitespace-nowrap px-6 py-4 text-left text-sm uppercase tracking-wider text-gray-900">
											{item.type}
										</td>
										<td className="truncate whitespace-nowrap px-6 py-4 text-left text-sm uppercase tracking-wider text-gray-900">
											{item.name}
										</td>
										<td className="whitespace-nowrap px-6 py-4 text-left text-sm tracking-wider text-gray-900">
											{item.country.country} &#40;{item.country.country_code}&#41;
										</td>
										<td className="whitespace-nowrap px-6 py-4 text-left text-sm tracking-wider text-gray-900">
											{new Date() > new Date(item.akl.expiry_date) ? (
												<span className="rounded-full bg-red-100 px-2 py-1 font-semibold text-red-600">
													Kadaluarsa
												</span>
											) : (
												<span className="rounded-full bg-green-100 px-3 py-1 font-semibold text-green-600">
													Aktif
												</span>
											)}
										</td>
										<td className="flex items-center justify-start whitespace-nowrap px-6 py-4 text-left text-sm uppercase tracking-wider text-gray-900">
											<button className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white py-1 px-2 text-slate-500 transition-colors duration-150 ease-in-out hover:bg-slate-100 hover:text-slate-600 focus:bg-slate-100 focus:outline-none focus:ring-0">
												<HiChevronDown className="h-5 w-5" />
											</button>
										</td>
									</tr>
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
			<div className="mt-auto border-t border-slate-300 bg-white py-3 text-center">2022</div>
		</div>
	);
}

export default AklLookup;
