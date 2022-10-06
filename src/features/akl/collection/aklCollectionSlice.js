import {
	createAsyncThunk,
	createEntityAdapter,
	createSelector,
	createSlice,
} from '@reduxjs/toolkit';

import { aklAPI } from '../../../api/akl';

const aklsCollectionAdapter = createEntityAdapter();

const initialState = aklsCollectionAdapter.getInitialState({
	status: 'idle',
	erorr: null,
});

export const downloadAklFile = createAsyncThunk(
	'aklsCollection/downloadAklFile',
	async (fileUrl, { rejectWithValue }) => {
		try {
			const response = aklAPI.downloadFile(fileUrl);
			return response.data;
		} catch (error) {
			return rejectWithValue(error.message);
		}
	}
);

const aklsCollectionSlice = createSlice({
	name: 'aklsCollection',
	initialState,
	reducers: {
		aklAdded: aklsCollectionAdapter.addOne,
		aklDeleted: aklsCollectionAdapter.removeOne,
		aklIdsReorder: {
			reducer(state, action) {
				const { draggedAklId, targetAklId } = action.payload;
				const draggedAklIdIndex = state.ids.findIndex((id) => id === draggedAklId.id);
				const targetAklIdIndex = state.ids.findIndex((id) => id === targetAklId);

				state.ids.splice(targetAklIdIndex, 0, state.ids.splice(draggedAklIdIndex, 1)[0]);
			},
			prepare(draggedAklId, targetAklId) {
				return {
					payload: { draggedAklId, targetAklId },
				};
			},
		},
		aklClearAll: () => initialState,
	},
	extraReducers: (builder) => {
		builder.addCase(downloadAklFile.pending, (state, action) => {
			state.status = 'loading';
		});
	},
});

export const { aklAdded, aklDeleted, aklIdsReorder, aklClearAll } = aklsCollectionSlice.actions;

export default aklsCollectionSlice.reducer;

export const { selectAll: selectAklsCollection, selectById: selectAklsCollectionById } =
	aklsCollectionAdapter.getSelectors((state) => state.aklsCollection);

export const selectAklsCollectionIds = createSelector(selectAklsCollection, (aklsSearch) =>
	aklsSearch.map((aklSearch) => aklSearch.id)
);
