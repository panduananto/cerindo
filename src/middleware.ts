import { NextResponse } from 'next/server'

import { createServerClient } from '@supabase/ssr'

import { env } from './env.mjs'

import type { CookieOptions } from '@supabase/ssr'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
	let response = NextResponse.next({
		request: {
			headers: request.headers,
		},
	})

	const supabase = createServerClient(
		env.NEXT_PUBLIC_SUPABASE_URL_PRODUCTION,
		env.NEXT_PUBLIC_SUPABASE_PUBLIC_KEY_PRODUCTION,
		{
			cookies: {
				get(name: string) {
					return request.cookies.get(name)?.value
				},
				set(name: string, value: string, options: CookieOptions) {
					request.cookies.set({
						name,
						value,
						...options,
					})
					response = NextResponse.next({
						request: {
							headers: request.headers,
						},
					})
					response.cookies.set({
						name,
						value,
						...options,
					})
				},
				remove(name: string, options: CookieOptions) {
					request.cookies.set({
						name,
						value: '',
						...options,
					})
					response = NextResponse.next({
						request: {
							headers: request.headers,
						},
					})
					response.cookies.set({
						name,
						value: '',
						...options,
					})
				},
			},
		},
	)

	await supabase.auth.getUser()

	return response
}

export const config = {
	matcher: ['/((?!api|_next/static|_next/image|favicon.ico|images).*)', '/'],
}
