import { NextResponse } from 'next/server'

import { getSupabaseActionsClient } from '@/lib/supabase/actions'

import type { NextRequest } from 'next/server'

export async function GET(request: NextRequest) {
	const { searchParams, origin } = new URL(request.url)

	const code = searchParams.get('code')
	const next = searchParams.get('next') ?? '/'

	if (code) {
		const supabase = getSupabaseActionsClient()

		const { error } = await supabase.auth.exchangeCodeForSession(code)

		if (!error) {
			return NextResponse.redirect(`${origin}${next}`)
		}
	}

	return NextResponse.redirect(`${origin}/auth/auth-code-error`)
}
