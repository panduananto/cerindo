// https://github.com/vercel/next.js/discussions/49465#discussioncomment-7034208

'use client'

import React, { useEffect, useState } from 'react'

import { getHash } from '@/lib/utils'

const useHash = () => {
	const [hash, setHash] = useState(getHash())
	const [isClient, setIsClient] = useState(false)

	useEffect(() => {
		setIsClient(true)

		const handleHashChange = () => {
			setHash(getHash())
		}

		window.addEventListener('hashchange', handleHashChange)

		return () => {
			window.removeEventListener('hashchange', handleHashChange)
		}
	}, [])

	return isClient ? hash : null
}

export default useHash
