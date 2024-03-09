import { configureStore } from '@reduxjs/toolkit'
import { useDispatch, useSelector, useStore } from 'react-redux'

import aklReducer from './features/akl/akl-slice'
import skpReducer from './features/skp/skp-slice'

import type { TypedUseSelectorHook } from 'react-redux'

export const makeStore = () => {
	return configureStore({
		reducer: {
			akl: aklReducer,
			skp: skpReducer,
		},
	})
}

export type AppStore = ReturnType<typeof makeStore>
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export const useAppStore: () => AppStore = useStore
