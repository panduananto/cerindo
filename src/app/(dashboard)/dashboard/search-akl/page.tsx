import React from 'react'

import AklSearchBar from '@/components/akl-search-bar'
import AklTable from '@/components/akl-table'
import AklTableFooter from '@/components/akl-table-footer'

export default async function SearchAklPage() {
	return (
		<div className="flex h-full flex-auto flex-col overflow-y-auto bg-white text-slate-900">
			<div className="p-8 sm:px-10 lg:px-12">
				<h1 className="text-xl font-semibold leading-8 sm:text-2xl 2md:text-3xl">Pencarian AKL</h1>
				<p className="mt-1 font-normal text-slate-700">Cari dan tinjau izin AKL yang Anda butuhkan</p>
				<AklSearchBar />
			</div>
			<AklTable />
			<AklTableFooter />
		</div>
	)
}
