'use server'

import { revalidatePath } from 'next/cache'

import { getSupabaseActionsClient } from '../supabase/actions'
import { getErrorMessage } from '../utils'
import { importersSchema } from '../validations/skpabean'

export async function updateImporter(id: string, formData: FormData) {
	const supabase = getSupabaseActionsClient()
	const values = Object.fromEntries(formData.entries())
	const validatedFields = importersSchema.safeParse(values)

	if (!validatedFields.success) {
		const errorMessage = getErrorMessage(validatedFields.error)

		return {
			error: errorMessage,
		}
	}

	const { pic, picTitle, company, address, npwp, phone } = validatedFields.data

	try {
		const { data, error } = await supabase
			.from('importers')
			.update({
				official_name: pic,
				official_title: picTitle,
				company_name: company,
				company_address: address,
				company_phone: phone,
				npwp: npwp,
			})
			.eq('id', id)

		if (error) {
			throw new Error(getErrorMessage(error))
		}

		return data
	} catch (error: unknown) {
		return {
			error: getErrorMessage(error),
		}
	}
}
