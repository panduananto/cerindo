import { createSlice, nanoid } from '@reduxjs/toolkit'

import type { Akl } from '@/types'
import type { PayloadAction } from '@reduxjs/toolkit'

const initialState: Akl[] = []

const aklSlice = createSlice({
	name: 'akl',
	initialState,
	reducers: (create) => ({
		addAkl: create.preparedReducer(
			(data: Akl) => {
				const modifiedId = data.id + nanoid(10)

				return {
					payload: {
						...data,
						id: modifiedId,
					},
				}
			},
			(state, action) => {
				state.push(action.payload)
			},
		),
		deleteAkl: create.reducer((state, action: PayloadAction<{ id: string }>) => {
			state = state.filter((data) => data.id !== action.payload.id)
		}),
	}),
})

export const { addAkl, deleteAkl } = aklSlice.actions

export default aklSlice.reducer
