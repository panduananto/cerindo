import { cookies } from 'next/headers'

import { env } from '@/env.mjs'
import { createServerClient } from '@supabase/ssr'

import type { Database } from '@/types/supabase'

export function getSupabaseServerClient() {
	const cookiesStore = cookies()

	return createServerClient<Database>(
		env.NEXT_PUBLIC_SUPABASE_URL_PRODUCTION,
		env.NEXT_PUBLIC_SUPABASE_PUBLIC_KEY_PRODUCTION,
		{
			cookies: {
				get(name: string) {
					return cookiesStore.get(name)?.value
				},
			},
		},
	)
}
