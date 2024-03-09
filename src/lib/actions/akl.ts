'use server'

import { getSupabaseActionsClient } from '../supabase/actions'
import { getErrorMessage } from '../utils'

import type { SearchAklQuery, SearchAklResult } from '@/types'

export async function searchAkl(query: string): Promise<SearchAklResult | null> {
	if (query.length === 0) {
		return null
	}

	const supabase = getSupabaseActionsClient()

	const { data, error } = await supabase
		.from('akl_items')
		.select(
			`id, type, name, facility,
			akl (id, brand_name, packaging, date, expiry_date, file_url),
			hscode (code, import_dutyfees, value_added_tax, income_tax_api, income_tax_non_api, lartas),
			countries (code, name)`,
		)
		.eq('type', query)
		.returns<SearchAklQuery>()

	if (error) {
		throw new Error(getErrorMessage(error))
	}

	const transformedResult = data.map((result) => {
		const { id: id_akl, ...aklWithoutId } = result.akl
		const { akl, countries, hscode, ...rest } = result

		return {
			id_akl,
			countries,
			hscode,
			...rest,
			...aklWithoutId,
		}
	})

	return transformedResult as unknown as SearchAklResult
}
