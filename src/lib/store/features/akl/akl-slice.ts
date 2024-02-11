import { createSlice } from '@reduxjs/toolkit'

import type { Akl } from '@/types'

const initialState: Akl[] = []

const aklSlice = createSlice({
	name: 'akl',
	initialState,
	reducers: {
		aklAdded(state, action) {
			state.push(action.payload)
		},
	},
})

export const { aklAdded } = aklSlice.actions

export default aklSlice.reducer
