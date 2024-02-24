import type { Database } from '@/types/supabase'
import type { SupabaseClient } from '@supabase/supabase-js'

export function getImporterById(client: SupabaseClient<Database>, id: string) {
	return client.from('importers').select(`*`).eq('id', id).single()
}
