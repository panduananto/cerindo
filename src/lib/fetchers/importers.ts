import { ImporterList } from '@/types'

import { getSupabaseServerClient } from '../supabase/server'

export async function getListImporters() {
	const supabase = getSupabaseServerClient()

	try {
		const { data, error } = await supabase.from('importers').select(`id, company_name, npwp`).returns<ImporterList>()

		if (error) {
			throw new Error()
		}

		return data
	} catch (error: unknown) {
		console.log(error)
		return []
	}
}
