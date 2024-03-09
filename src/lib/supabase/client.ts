import { env } from '@/env.mjs'
import { createBrowserClient } from '@supabase/ssr'

import type { Database } from '@/types/supabase'

export default function getSupabaseBrowserClient() {
	return createBrowserClient<Database>(
		env.NEXT_PUBLIC_SUPABASE_URL_PRODUCTION,
		env.NEXT_PUBLIC_SUPABASE_PUBLIC_KEY_PRODUCTION,
	)
}
