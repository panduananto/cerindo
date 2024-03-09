import React from 'react'

import { rubik } from '@/config/font'

const WIP = () => {
	return (
		<div className="mx-4 flex h-full flex-col items-center justify-center text-center">
			<h1 className={`${rubik.className} text-5xl font-semibold leading-10 2md:text-6xl`}>Halaman sedang dikerjakan</h1>
			<p className="mt-4 text-lg font-normal text-slate-700">Fitur yang lebih baik sedang dibuat</p>
		</div>
	)
}

export default WIP
