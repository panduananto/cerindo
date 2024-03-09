'use client'

import React, { useRef } from 'react'

import { Provider } from 'react-redux'

import { makeStore } from '../../lib/store/store'

import type { AppStore } from '../../lib/store/store'

type StoreProviderProps = {
	children: React.ReactNode
}

export default function StoreProvider({ children }: StoreProviderProps) {
	const storeRef = useRef<AppStore>()

	if (!storeRef.current) {
		storeRef.current = makeStore()
	}

	return <Provider store={storeRef.current}>{children}</Provider>
}
