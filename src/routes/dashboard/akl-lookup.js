import React, { useState } from 'react';

import { Combobox } from '@headlessui/react';
import { HiMail, HiSearch, HiSearchCircle } from 'react-icons/hi';

function AklLookup() {
	const [akl, setAkl] = useState([]);
	const [selectedAkl, setSelectedAkl] = useState([]);
	const [query, setQuery] = useState('');

	const filteredAkl =
		query === ''
			? []
			: [].filter((akl) => {
					return akl.toLowerCase().includes(query.toLowerCase());
			  });

	return (
		<div className="h-[calc(100vh-65px)] w-full overflow-y-auto bg-slate-50 px-8 py-8 text-slate-900 sm:px-10 lg:px-12">
			<h1 className="font-rubik text-3xl font-semibold leading-8">Pencarian AKL</h1>
			<p className="mt-1 text-sm font-medium text-slate-700">Tambah, cari, tinjau izin AKL</p>
			<div className="relative mt-4 w-full cursor-default overflow-hidden rounded-lg border border-slate-300 bg-white">
				<Combobox value={selectedAkl} onChange={setSelectedAkl}>
					<div className="relative">
						<div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
							<HiSearch className="h-5 w-5 text-slate-700" />
						</div>
						<Combobox.Input
							onChange={(event) => setQuery(event.target.value)}
							placeholder="Cari izin AKL di sini..."
							className="w-full border-none px-3 py-4 pl-10 leading-5"
						/>
					</div>
					<Combobox.Options>
						{filteredAkl.map((akl) => (
							<Combobox.Option key={akl} value={akl}>
								{akl}
							</Combobox.Option>
						))}
					</Combobox.Options>
				</Combobox>
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
