import React, { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { useDebounce } from 'use-debounce';
import { HiSearch, HiX } from 'react-icons/hi';

import {
	fetchAkl,
	selectAklsSearchIds,
	aklsSearchClearAll,
} from '../../../features/akl/search/aklSearchSlice';

import AklSearchResult from './AklSearchResult';

import useOutsideClick from '../../../hooks/useOutsideClick';

function AklSearch() {
	const [query, setQuery] = useState('');
	const [debouncedQuery] = useDebounce(query, 800);

	const dispatch = useDispatch();

	const aklsSearchIds = useSelector(selectAklsSearchIds);
	const loadingStatus = useSelector((state) => state.aklsSearch.status);

	const handleClearQuery = () => {
		setQuery('');
	};

	const searchbarRef = useOutsideClick(handleClearQuery);

	useEffect(() => {
		let isSubscribed = true;

		if (isSubscribed && debouncedQuery !== '') {
			dispatch(fetchAkl(debouncedQuery));
		}

		return () => (isSubscribed = false);
	}, [dispatch, debouncedQuery]);

	useEffect(() => {
		dispatch(aklsSearchClearAll());
	}, [dispatch, query]);

	return (
		<div className="bg-white px-8 py-8 text-slate-900 sm:px-10 lg:px-12">
			<h1 className="text-xl font-semibold leading-8 sm:text-2xl 2md:text-3xl">Pencarian AKL</h1>
			<p className="mt-1 font-medium text-slate-700">Cari dan tinjau izin AKL yang Anda butuhkan</p>
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
				{loadingStatus === 'loading' ? (
					<div className="absolute top-[4.125rem] left-1/2 z-50 w-full -translate-x-1/2 rounded border border-slate-200 bg-white py-4 px-4 text-center shadow-lg sm:w-max">
						Sedang mencari izin AKL...
					</div>
				) : loadingStatus === 'idle' &&
				  query !== '' &&
				  debouncedQuery !== '' &&
				  aklsSearchIds !== null ? (
					aklsSearchIds.length === 0 ? (
						<div className="absolute top-[4.125rem] left-1/2 z-50 w-full -translate-x-1/2 rounded border border-slate-200 bg-white py-4 px-4 text-center shadow-lg sm:w-max">
							Izin AKL yang Anda cari tidak ditemukan
						</div>
					) : (
						<ul className="absolute top-[4.125rem] z-50 flex max-h-60 w-full flex-col overflow-y-auto rounded border border-slate-200 bg-white py-4 shadow-xl">
							{aklsSearchIds.map((aklId) => {
								return <AklSearchResult key={aklId} id={aklId} />;
							})}
						</ul>
					)
				) : null}
			</div>
		</div>
	);
}

export default AklSearch;
