import { configureStore } from '@reduxjs/toolkit'

import aklsColectionReducers from '../features/akl/collection/aklCollectionSlice'
import aklsSearchReducers from '../features/akl/search/aklSearchSlice'

const store = configureStore({
	reducer: {
		aklsSearch: aklsSearchReducers,
		aklsCollection: aklsColectionReducers,
	},
})

export default store
