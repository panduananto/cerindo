'use client'

import React, { useMemo } from 'react'

import { useAppSelector } from '@/lib/store/store'

const AklTableFooter = () => {
	const akl = useAppSelector((state) => state.akl)
	const distinctAkl = useMemo(() => {
		return [...new Set(akl.map((item) => item.id_akl))]
	}, [akl])

	return (
		<div className="mt-auto flex items-center justify-between border-t border-slate-300 bg-white px-4 py-1 sm:px-6 2md:py-3 lg:px-8">
			<p className="text-[13px] text-slate-700">
				<span className="font-extrabold">{akl.length}</span> barang dan{' '}
				<span className="font-extrabold">{distinctAkl.length}</span> izin AKL terpilih
			</p>
		</div>
	)
}

export default AklTableFooter
