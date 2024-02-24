import React from 'react'

import { getListImporters } from '@/lib/fetchers/importers'

import ImportersItem from './importers-item'

type ImportersListProps = {
	search: string
}

export default async function ImportersList({ search }: ImportersListProps) {
	const importers = await getListImporters()

	if (importers.length === 0) {
		return (
			<div className="flex items-center px-8 py-5 hover:bg-muted">
				<p className="border border-dashed border-border ">Tidak ada data importir</p>
			</div>
		)
	}

	const filtered = importers.filter((importer) => {
		return importer.company_name.toLowerCase().includes(search.toLowerCase())
	})

	return (
		<ul className="flex-auto overflow-y-auto">
			{filtered.length === 0 ? (
				<li className="flex items-center justify-center px-8 py-5">Data importir tidak ditemukan</li>
			) : (
				filtered.map((importer) => {
					return <ImportersItem key={importer.id} item={importer} />
				})
			)}
		</ul>
	)
}
