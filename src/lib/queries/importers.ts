import type { Database } from '@/types/supabase'
import type { SupabaseClient } from '@supabase/supabase-js'

export function getImporterById(client: SupabaseClient<Database>, id: string) {
	return client
		.from('importers')
		.select(
			`npwp, company:company_name, pic:official_name, picTitle:official_title, address:company_address, phone:company_phone`,
		)
		.eq('id', id)
		.single()
}
