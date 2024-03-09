'use client'

import React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { createUrl } from '@/lib/utils'

type ImportersItem = {
	item: {
		id: string
		company_name: string
		npwp: string
	}
}

const ImportersItem = ({ item }: ImportersItem) => {
	const pathname = usePathname()
	const href = createUrl(pathname, new URLSearchParams({ query: item.id }))

	return (
		<li key={item.id} className="flex flex-col items-start hover:bg-muted">
			<Link href={href} className="w-full px-8 py-2">
				<p className="font-medium">{item.company_name}</p>
				<p className="font-normal text-slate-700">{item.npwp}</p>
			</Link>
		</li>
	)
}

export default ImportersItem
