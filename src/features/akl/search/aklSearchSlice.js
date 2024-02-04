import { createAsyncThunk, createEntityAdapter, createSelector, createSlice } from '@reduxjs/toolkit'
import { HiExclamationCircle } from 'react-icons/hi'
import { toast } from 'react-toastify'

import { aklAPI } from '../../../api/akl'

const aklsSearchAdapter = createEntityAdapter()

const initialState = aklsSearchAdapter.getInitialState({
	status: 'idle',
	error: null,
})

export const fetchAkl = createAsyncThunk('aklsSearchSlice/fetchAkl', async (query, { rejectWithValue }) => {
	try {
		let response = await aklAPI.fetch(query)
		return response.data
	} catch (error) {
		return rejectWithValue(error.message)
	}
})

const aklsSearchSlice = createSlice({
	name: 'aklsSearch',
	initialState,
	reducers: {
		aklsSearchClearAll: () => initialState,
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchAkl.pending, (state, action) => {
				state.status = 'loading'
			})
			.addCase(fetchAkl.fulfilled, (state, action) => {
				aklsSearchAdapter.setAll(state, action.payload)
				state.status = 'idle'
			})
			.addCase(fetchAkl.rejected, (state, action) => {
				state.status = 'failed'
				toast.error('Koneksi bermasalah. Coba lagi.', {
					icon: <HiExclamationCircle className="h-5 w-5 text-red-600" />,
				})
			})
	},
})

export const { aklsSearchClearAll } = aklsSearchSlice.actions

export default aklsSearchSlice.reducer

export const { selectAll: selectAklsSearch, selectById: selectAklsSearchById } = aklsSearchAdapter.getSelectors(
	(state) => state.aklsSearch,
)

export const selectAklsSearchIds = createSelector(selectAklsSearch, (aklsSearch) =>
	aklsSearch.map((aklSearch) => aklSearch.id),
)
