import React, { useEffect, useState } from 'react';

import { toast } from 'react-toastify';
import { nanoid } from 'nanoid';
import { useDebounce } from 'use-debounce';
import { HiSearch, HiX, HiCheckCircle, HiExclamation, HiExclamationCircle } from 'react-icons/hi';

import supabase from '../../../supabase';
import useOutsideClick from '../../../hooks/useOutsideClick';

function AklSearch({ items, aklCollection, setItems, setAklCollection }) {
	const [loading, setLoading] = useState(false);
	const [query, setQuery] = useState('');
	const [debouncedQuery] = useDebounce(query, 800);
	const [queryResult, setQueryResult] = useState(null);

	const handleClearQuery = () => {
		setQuery('');
	};

	const searchbarRef = useOutsideClick(handleClearQuery);

	const handleFetchAklFile = async (url) => {
		return await supabase.storage.from('cerindo').download(`akl/${url}`);
	};

	const handleSaveAkl = async (akl) => {
		const { data, error } = await handleFetchAklFile(akl.file_url);

		if (error) throw error;

		const newAkl = {
			id: akl.id,
			date: akl.date,
			expiry_date: akl.expiry_date,
			file: data,
		};

		setAklCollection([...aklCollection, newAkl]);
	};

	const handleSaveItemAndAkl = async (id) => {
		const target = queryResult
			.filter((item) => item.id === id)
			.map((item) => ({
				...item,
				id: item.id + nanoid(10),
			}));

		if (target === null) return;

		const { akl: aklTarget } = target[0];

		const aklCode = aklTarget.id.split('_').join(' ');
		const checkDuplicateAkl = aklCollection.some((a) => a.id === aklTarget.id);

		if (!checkDuplicateAkl) {
			toast.promise(handleSaveAkl(aklTarget), {
				pending: {
					render() {
						return `Mengunduh ${aklCode}`;
					},
				},
				success: {
					render() {
						setItems([...items, ...target]);

						return `${aklCode} berhasil ditambahkan`;
					},
					icon: <HiCheckCircle className="h-5 w-5 text-green-600" />,
				},
				error: {
					renter() {
						return 'Maaf, ada kesalahan. Coba lagi.';
					},
					icon: <HiExclamationCircle className="h-5 w-5 text-red-600" />,
				},
			});
		} else {
			setItems([...items, ...target]);

			toast.warn(`${aklCode} telah terdaftar`, {
				icon: <HiExclamation className="h-5 w-5 text-yellow-600" />,
			});
		}
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
							`id, type, name, facility,
							akl:id_akl (id, brand_name, packaging, date, expiry_date, file_url),
							hscode:id_hscode (code, import_dutyfees, value_added_tax, income_tax_api, income_tax_non_api, lartas),
							country:id_country (code, name)`
						)
						.eq('type', aklQuery);

					if (errorAKL) throw errorAKL;

					setQueryResult(itemAKL);
				} catch (error) {
					toast.error('Koneksi bermasalah. Coba lagi.', {
						icon: <HiExclamationCircle className="h-5 w-5 text-red-600" />,
					});
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
		<div className="bg-white px-8 py-8 text-slate-900 sm:px-10 lg:px-12">
			<h1 className="text-xl font-semibold leading-8 sm:text-2xl 2md:text-3xl">Pencarian AKL</h1>
			<p className="mt-1 text-sm font-medium text-slate-700">
				Cari dan tinjau izin AKL yang Anda butuhkan
			</p>
			<div ref={searchbarRef} className="relative mt-4 flex w-full flex-col">
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
						className="block w-full rounded border border-slate-300 bg-white p-3 pl-10 text-sm text-slate-900 placeholder-slate-400 shadow-sm placeholder:text-sm focus:border-red-600 focus:outline-none focus:ring-1 focus:ring-red-600"
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
					<div className="absolute top-[4.125rem] left-1/2 z-50 w-full -translate-x-1/2 rounded border border-slate-200 bg-white py-4 px-4 text-center shadow-lg sm:w-max">
						Sedang mencari izin AKL...
					</div>
				) : !loading && query !== '' && queryResult !== null ? (
					queryResult.length === 0 ? (
						<div className="absolute top-[4.125rem] left-1/2 z-50 w-full -translate-x-1/2 rounded border border-slate-200 bg-white py-4 px-4 text-center shadow-lg sm:w-max">
							Izin AKL yang Anda cari tidak ditemukan
						</div>
					) : (
						<ul className="absolute top-[4.125rem] z-50 flex max-h-60 w-full flex-col overflow-y-auto rounded border border-slate-200 bg-white py-4 shadow-xl">
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
											{result.type} - {result.country.name}
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
	);
}

export default AklSearch;
