import React from 'react'

import { nanoid } from '@reduxjs/toolkit'
import { HiCheckCircle, HiExclamation } from 'react-icons/hi'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'

import { aklAdded, selectAklsCollection } from '../../../features/akl/collection/aklCollectionSlice'
import { selectAklsSearchById } from '../../../features/akl/search/aklSearchSlice'

function AklSearchResult({ id }) {
	const dispatch = useDispatch()

	const aklsCollection = useSelector(selectAklsCollection)
	const akl = useSelector((state) => selectAklsSearchById(state, id))

	const handleSaveItemAndAkl = () => {
		const aklIdFormatted = akl.akl.id.split('_').join(' ')
		const duplicateAkl = aklsCollection.some((a) => a.akl.id === akl.akl.id)
		const aklWithModifiedId = { ...akl, id: akl.id + nanoid(10) }

		dispatch(aklAdded(aklWithModifiedId))

		if (duplicateAkl) {
			toast.warn(`${aklIdFormatted} telah terdaftar`, {
				icon: <HiExclamation className="h-5 w-5 text-yellow-600" />,
			})
		} else {
			toast.success(`${aklIdFormatted} Berhasil ditambahkan`, {
				icon: <HiCheckCircle className="h-5 w-5 text-green-600" />,
			})
		}
	}

	return (
		<li
			key={akl.id}
			className="cursor-pointer px-4 py-2 hover:bg-slate-100"
			onClick={() => handleSaveItemAndAkl(akl.id)}
		>
			<p className="font-bold">
				{akl.akl.brand_name} / {akl.name}
			</p>
			<p className="text-slate-700">
				{akl.type} - {akl.country.name}
			</p>
			<p className="mt-3 text-sm text-slate-700">
				<span className="font-semibold text-red-600">Expiry date:</span>{' '}
				{new Date(akl.akl.expiry_date).toLocaleDateString()}
			</p>
		</li>
	)
}

export default AklSearchResult
