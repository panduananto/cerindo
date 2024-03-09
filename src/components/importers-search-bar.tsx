'use client'

import React from 'react'
import { useRouter, useSearchParams } from 'next/navigation'

import { createUrl } from '@/lib/utils'

import { Button } from './ui/button'
import Icons from './ui/icons'
import { Input } from './ui/input'

const ImportersSearchBar = () => {
	const router = useRouter()
	const searchParams = useSearchParams()

	const handleOnSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
		event.preventDefault()

		const val = event.target as HTMLInputElement
		const importer = val as HTMLInputElement
		const newParams = new URLSearchParams(searchParams.toString())

		if (importer.value) {
			newParams.set('search', importer.value)
		} else {
			newParams.delete('search')
		}

		router.push(createUrl('/dashboard/skpabean', newParams))
	}

	const handleReset = () => {
		router.push('/dashboard/skpabean')
	}

	return (
		<React.Fragment>
			<div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 xl:pl-11">
				<Icons.search className="size-4 text-slate-400" aria-hidden="true" />
			</div>
			<Input
				key={searchParams?.get('search')}
				type="text"
				id="importer"
				name="impoter"
				placeholder="Cari importir..."
				autoComplete="off"
				onBlur={(event: React.ChangeEvent<HTMLInputElement>) => handleOnSearch(event)}
				defaultValue={searchParams?.get('search') || ''}
				className="pl-9 placeholder:text-sm"
			/>
			{searchParams?.get('search') && searchParams?.get('search') !== '' && (
				<div className="absolute inset-y-0 right-0 flex items-center pr-3">
					<Button variant="ghost" size="icon" onClick={handleReset}>
						<Icons.x className="size-4" />
						<span className="sr-only">Clear search query</span>
					</Button>
				</div>
			)}
		</React.Fragment>
	)
}

export default ImportersSearchBar
