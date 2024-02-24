'use client'

import React from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

import { createUrl } from '@/lib/utils'

import Icons from './ui/icons'
import { Input } from './ui/input'

const ImportersSearchBar = () => {
	const router = useRouter()
	const searchParams = useSearchParams()

	const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault()

		const val = event.target as HTMLFormElement
		const importer = val.importer as HTMLInputElement
		const newParams = new URLSearchParams(searchParams.toString())

		if (importer.value) {
			newParams.set('search', importer.value)
		} else {
			newParams.delete('search')
		}

		router.push(createUrl('/dashboard/skpabean', newParams))
	}

	return (
		<form className="relative w-full flex-1" onSubmit={onSubmit}>
			<div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
				<Icons.search className="size-4 text-slate-400" aria-hidden="true" />
			</div>
			<Input
				key={searchParams?.get('search')}
				type="text"
				id="importer"
				name="impoter"
				placeholder="Cari importir..."
				autoComplete="off"
				defaultValue={searchParams?.get('search') || ''}
				className="pl-9 placeholder:text-sm"
			/>
		</form>
	)
}

export default ImportersSearchBar
