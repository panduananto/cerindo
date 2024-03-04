import { createSlice } from '@reduxjs/toolkit'
import * as z from 'zod'

import type { importersSchema, shipmentSchema } from '@/lib/validations/skpabean'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../store'

type InitialStateType = {
	importer: z.infer<typeof importersSchema> | undefined
	shipment: z.infer<typeof shipmentSchema> | undefined
}

const initialState: InitialStateType = { importer: undefined, shipment: undefined }

const skpSlice = createSlice({
	name: 'skp',
	initialState,
	reducers: (create) => ({
		upsertImporter: create.reducer((state, action: PayloadAction<z.infer<typeof importersSchema>>) => {
			state.importer = action.payload
		}),
		upsertShipment: create.reducer((state, action: PayloadAction<z.infer<typeof shipmentSchema>>) => {
			state.shipment = action.payload
		}),
	}),
})

export const { upsertImporter, upsertShipment } = skpSlice.actions

export default skpSlice.reducer

export const selectImporter = (state: RootState) => state.skp.importer

export const selectShipment = (state: RootState) => state.skp.shipment
