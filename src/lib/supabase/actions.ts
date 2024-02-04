import { cookies } from 'next/headers'

import { env } from '@/env.mjs'
import { createServerClient } from '@supabase/ssr'

import type { Database } from '@/types/supabase'
import type { CookieOptions } from '@supabase/ssr'

export function getSupabaseActionsClient() {
	const cookiesStore = cookies()

	return createServerClient<Database>(
		env.NEXT_PUBLIC_SUPABASE_URL_PRODUCTION,
		env.NEXT_PUBLIC_SUPABASE_PUBLIC_KEY_PRODUCTION,
		{
			cookies: {
				get(name: string) {
					return cookiesStore.get(name)?.value
				},
				set(name: string, value: string, options: CookieOptions) {
					cookiesStore.set({ name, value, ...options })
				},
				remove(name: string, options: CookieOptions) {
					cookiesStore.set({ name, value: '', ...options })
				},
			},
		},
	)
}
