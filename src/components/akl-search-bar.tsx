'use client'

import React, { useEffect, useRef, useState, useTransition } from 'react'

import { useDebounceValue, useOnClickOutside } from 'usehooks-ts'

import { searchAkl } from '@/lib/actions/akl'
import { aklAdded } from '@/lib/store/features/akl/akl-slice'
import { useAppDispatch, useAppSelector } from '@/lib/store/store'
import { cn, getErrorMessage } from '@/lib/utils'

import { Button } from './ui/button'
import { Card, CardContent } from './ui/card'
import Icons from './ui/icons'
import { Input } from './ui/input'
import { ScrollArea } from './ui/scroll-area'
import { useToast } from './ui/use-toast'

import type { Akl, SearchAklResult } from '@/types'

const AklSearchBar = () => {
	const { toast } = useToast()

	const [query, setQuery] = useState<string>('')
	const [debouncedQuery, setDebouncedQuery] = useDebounceValue(query, 300)
	const [data, setData] = useState<SearchAklResult | null>(null)
	const [isPending, startTransition] = useTransition()

	const ref = useRef(null)
	const dispatch = useAppDispatch()

	useEffect(() => {
		if (debouncedQuery === '') {
			setData(null)
			return
		}

		async function fetchData() {
			try {
				const data = await searchAkl(debouncedQuery)
				setData(data)
			} catch (error: unknown) {
				toast({
					variant: 'destructive',
					title: 'Something went wrong',
					description: getErrorMessage(error),
				})
			}
		}

		startTransition(() => fetchData())

		return () => setData(null)
	}, [debouncedQuery])

	const handleReset = () => {
		setQuery('')
	}

	const handleSaveItemAkl = (data: Akl) => {
		dispatch(aklAdded(data))
	}

	useOnClickOutside(ref, handleReset)

	return (
		<div ref={ref} className="relative mt-4 flex flex-col items-center justify-center rounded bg-white">
			<div className="relative w-full flex-1">
				<div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
					<Icons.search className="size-4 text-slate-400" />
				</div>
				<Input
					autoComplete="off"
					type="text"
					id="aklType"
					name="aklType"
					placeholder="Cari izin AKL berdasarkan tipe ART barang, cth: 4556666, 8701148SP"
					value={query}
					onChange={(event: React.ChangeEvent<HTMLInputElement>) => setQuery(event.target.value)}
					className="pl-9 placeholder:text-sm placeholder:text-slate-400"
				/>
				{query !== '' && (
					<div className="absolute inset-y-0 right-0 flex items-center pr-3">
						<Button variant="ghost" size="icon" onClick={handleReset}>
							<Icons.x className="size-4" />
							<span className="sr-only">Clear search query</span>
						</Button>
					</div>
				)}
			</div>
			{query !== '' && (
				<Card
					className={cn(
						'absolute left-1/2 top-14 z-50 -translate-x-1/2 shadow-lg',
						isPending || (data?.length === 0 && 'w-full sm:w-max'),
						data && data.length !== 0 && 'w-full',
					)}
				>
					{isPending ? (
						<CardContent className="p-4">Sedang mencari izin AKL...</CardContent>
					) : data && data.length !== 0 ? (
						<CardContent className="w-full p-0">
							<ScrollArea className="max-h-60">
								<ul className="py-4">
									{data.map((akl, index) => {
										return (
											<li
												key={`${akl.id}-${index}`}
												className="cursor-pointer px-4 py-2 hover:bg-slate-100"
												onClick={() => handleSaveItemAkl(akl)}
											>
												<p className="font-bold">
													{akl.brand_name} / {akl.name}
												</p>
												<p className="text-slate-700">
													{akl.type} - {akl.countries.name}
												</p>
												<p className="mt-3 text-sm text-slate-700">
													<span className="font-semibold text-red-600">Expiry date:</span>{' '}
													{new Date(akl.expiry_date ? akl.expiry_date : Date.now()).toLocaleDateString()}
												</p>
											</li>
										)
									})}
								</ul>
							</ScrollArea>
						</CardContent>
					) : (
						<CardContent className="p-4">Izin AKL yang Anda cari tidak ditemukan</CardContent>
					)}
				</Card>
			)}
		</div>
	)
}

export default AklSearchBar
