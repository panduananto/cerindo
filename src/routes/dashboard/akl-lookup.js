import React, { useEffect, useState } from 'react';

import { HiSearch } from 'react-icons/hi';
import { useDebounce } from 'use-debounce';

import supabase from '../../supabase';

function AklLookup() {
	const [loading, setLoading] = useState(false);
	const [akl, setAkl] = useState([]);
	const [resultAkl, setResultAkl] = useState(null);
	const [query, setQuery] = useState('');
	const [debouncedQuery] = useDebounce(query, 800);

	useEffect(() => {
		let isSubscribed = true;

		const fetchAKL = async (aklQuery) => {
			setLoading(true);

			try {
				let { data: itemAKL, error: errorAKL } = await supabase
					.from('item_akl')
					.select('*')
					.eq('type', aklQuery.toLowerCase());

				if (errorAKL) throw errorAKL;

				if (isSubscribed && aklQuery !== '') {
					setResultAkl(itemAKL);
				} else {
					setResultAkl([]);
				}
			} catch (error) {
				console.log(error); // TODO: show error message to user
			} finally {
				setLoading(false);
			}
		};

		fetchAKL(debouncedQuery);

		return () => (isSubscribed = false);
	}, [debouncedQuery]);

	return (
		<div className="h-[calc(100vh-65px)] w-full overflow-y-auto bg-slate-50 px-8 py-8 text-slate-900 sm:px-10 lg:px-12">
			<h1 className="font-rubik text-3xl font-semibold leading-8">Pencarian AKL</h1>
			<p className="mt-1 text-sm font-medium text-slate-700">Tambah, cari, tinjau izin AKL</p>
			<div className="relative mt-4 flex w-full flex-col">
				<label htmlFor="email" className="sr-only">
					Email
				</label>
				<div className="relative">
					<div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
						<HiSearch className="h-5 w-5 text-slate-700" />
					</div>
					<input
						type="text"
						id="aklType"
						name="aklType"
						placeholder="Cari izin AKL berdasarkan tipe ART barang, ex: 4556666"
						className="block w-full rounded border border-slate-300 bg-white px-3 py-4 pl-10 text-slate-900 placeholder-slate-400 shadow focus:border-red-600 focus:outline-none focus:ring-1 focus:ring-red-600"
						autoComplete="off"
						aria-expanded="false"
						onChange={(event) => setQuery(event.target.value)}
					/>
				</div>
				<ul className="absolute top-16 flex w-full flex-row items-center justify-center rounded bg-white py-4 shadow">
					{loading
						? 'Loading...'
						: resultAkl === null && query === ''
						? null
						: resultAkl.length === 0
						? 'AKL tidak ditemukan untuk barang yang Anda cari'
						: resultAkl.map((akl) => {
								return (
									<li key={akl.id} className="px-4">
										{akl.name}
									</li>
								);
						  })}
				</ul>
			</div>
			{akl.length === 0 ? (
				<div className="mt-6 h-full rounded border-2 border-dashed border-slate-300">
					<div className="flex h-full items-center justify-center">
						<p className="font-medium">Anda belum memilih izin AKL</p>
					</div>
				</div>
			) : (
				<div></div>
			)}
		</div>
	);
}

export default AklLookup;
