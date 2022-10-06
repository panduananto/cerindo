import { configureStore } from '@reduxjs/toolkit';

import aklsSearchReducers from '../features/akl/search/aklSearchSlice';
import aklsColectionReducers from '../features/akl/collection/aklCollectionSlice';

const store = configureStore({
	reducer: {
		aklsSearch: aklsSearchReducers,
		aklsCollection: aklsColectionReducers,
	},
});

export default store;
