import { createEnv } from '@t3-oss/env-nextjs'
import { z } from 'zod'

export const env = createEnv({
	server: {
		NODE_ENV: z.enum(['development', 'production']),
	},
	client: {
		NEXT_PUBLIC_SUPABASE_URL_LOCAL: z.string().url(),
		NEXT_PUBLIC_SUPABASE_URL: z.string().url(),
		NEXT_PUBLIC_APP_URL: z.string().url(),
		NEXT_PUBLIC_SUPABASE_PUBLIC_KEY_LOCAL: z.string(),
		NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string(),
	},
	runtimeEnv: {
		NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
		NEXT_PUBLIC_SUPABASE_PUBLIC_KEY_LOCAL: process.env.NEXT_PUBLIC_SUPABASE_PUBLIC_KEY_LOCAL,
		NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
		NEXT_PUBLIC_SUPABASE_URL_LOCAL: process.env.NEXT_PUBLIC_SUPABASE_URL_LOCAL,
		NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
		NODE_ENV: process.env.NODE_ENV,
	},
})
