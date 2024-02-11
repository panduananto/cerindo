import React from 'react'

import AklSearchBar from '@/components/akl-search-bar'

export default async function SearchAklPage() {
	return (
		<div className="bg-white p-8 sm:px-10 lg:px-12">
			<div className="text-slate-900 ">
				<h1 className="text-xl font-semibold leading-8 sm:text-2xl 2md:text-3xl">Pencarian AKL</h1>
				<p className="mt-1 font-normal text-slate-700">Cari dan tinjau izin AKL yang Anda butuhkan</p>
				<AklSearchBar />
			</div>
		</div>
	)
}
