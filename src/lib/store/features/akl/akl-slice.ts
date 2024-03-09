import { createEntityAdapter, createSelector, createSlice, nanoid } from '@reduxjs/toolkit'

import { RootState } from '../../store'

import type { Akl } from '@/types'
import type { PayloadAction } from '@reduxjs/toolkit'

const aklAdapter = createEntityAdapter<Akl>()

const initialState = aklAdapter.getInitialState({
	status: 'idle',
	error: null,
})

const aklSlice = createSlice({
	name: 'akl',
	initialState,
	reducers: (create) => ({
		addAkl: create.preparedReducer((data: Akl) => {
			const modifiedId = data.id + nanoid(10)

			return {
				payload: {
					...data,
					id: modifiedId,
				},
			}
		}, aklAdapter.addOne),
		deleteAkl: aklAdapter.removeOne,
		reorderAkl: create.reducer((state, action: PayloadAction<{ draggedId: string; targetId: string }>) => {
			const { draggedId, targetId } = action.payload

			const draggedIdIndex = state.ids.findIndex((id) => id === draggedId)
			const targetIdIndex = state.ids.findIndex((id) => id === targetId)

			state.ids.splice(targetIdIndex, 0, String(state.ids.splice(draggedIdIndex, 1).at(0)))
		}),
		clearAll: () => initialState,
	}),
})

export const { addAkl, deleteAkl, reorderAkl, clearAll } = aklSlice.actions

export default aklSlice.reducer

export const {
	selectIds: selectAklIds,
	selectAll: selectAllAkl,
	selectById: selectAklById,
} = aklAdapter.getSelectors<RootState>((state) => state.akl)

export const selectDistinctAkl = createSelector(selectAllAkl, (akl) => {
	const distinctAkl = akl.reduce(
		(accumulator: Pick<Akl, 'id_akl' | 'file_url' | 'date' | 'expiry_date'>[], current) => {
			// check if object exist with the same id_akl
			const existing = accumulator.findIndex((item) => item.id_akl === current.id_akl)

			// if not found, add the current item to the accumulator array
			if (existing === -1) {
				accumulator.push({
					id_akl: current.id_akl,
					file_url: current.file_url,
					date: current.date,
					expiry_date: current.expiry_date,
				})
			}

			return accumulator
		},
		[],
	)

	return distinctAkl
})
