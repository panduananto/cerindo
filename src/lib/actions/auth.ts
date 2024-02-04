'use server'

import { headers } from 'next/headers'
import { redirect } from 'next/navigation'

import { getSupabaseActionsClient } from '../supabase/actions'
import { getErrorMessage } from '../utils'
import { authSchema, oauthSchema } from '../validations/auth'

export async function resendEmailRegistration(prevState: { error?: string } | undefined, formData: FormData) {
	const supabase = getSupabaseActionsClient()
	const values = Object.fromEntries(formData.entries())
	const validatedFields = authSchema.pick({ email: true }).safeParse(values)

	if (!validatedFields.success) {
		const errorMessage = getErrorMessage(validatedFields.error)

		return {
			error: errorMessage,
		}
	}

	try {
		const { error } = await supabase.auth.resend({
			email: validatedFields.data.email,
			type: 'signup',
		})

		if (error) {
			throw new Error(getErrorMessage(error))
		}
	} catch (error: unknown) {
		return {
			error: getErrorMessage(error),
		}
	}
}

export async function registerWithEmail(formData: FormData) {
	const origin = headers().get('origin')
	const supabase = getSupabaseActionsClient()
	const values = Object.fromEntries(formData.entries())
	const validatedFields = authSchema.safeParse(values)

	if (!validatedFields.success) {
		const errorMessage = getErrorMessage(validatedFields.error)

		return {
			error: errorMessage,
		}
	}

	try {
		const { error } = await supabase.auth.signUp({
			email: validatedFields.data.email,
			password: validatedFields.data.password,
			options: {
				emailRedirectTo: `${origin}/auth/callback`,
			},
		})

		if (error) {
			throw new Error(getErrorMessage(error))
		}
	} catch (error: unknown) {
		return {
			error: getErrorMessage(error),
		}
	} finally {
		return redirect(`/register/verify-email?email=${validatedFields.data.email}`)
	}
}

export async function registerWithOauth(prevState: { error?: string } | undefined, formData: FormData) {
	const origin = headers().get('origin')
	const supabase = getSupabaseActionsClient()
	const values = Object.fromEntries(formData.entries())
	const validatedFields = oauthSchema.safeParse(values)

	let redirectUrl = ''

	if (!validatedFields.success) {
		const errorMessage = getErrorMessage(validatedFields.error)

		return {
			error: errorMessage,
		}
	}

	try {
		const { error, data } = await supabase.auth.signInWithOAuth({
			provider: validatedFields.data.provider,
			options: {
				redirectTo: `${origin}/auth/callback`,
				queryParams: {
					access_type: 'offline',
					prompt: 'consent',
				},
			},
		})

		if (error) {
			throw new Error(getErrorMessage(error))
		}

		redirectUrl = data.url
	} catch (error: unknown) {
		return {
			error: getErrorMessage(error),
		}
	}

	return redirect(redirectUrl)
}

export async function signInWithEmail(formData: FormData) {
	const supabase = getSupabaseActionsClient()
	const values = Object.fromEntries(formData.entries())
	const validatedFields = authSchema.safeParse(values)

	if (!validatedFields.success) {
		const errorMessage = getErrorMessage(validatedFields.error)

		return {
			error: errorMessage,
		}
	}

	try {
		const { error } = await supabase.auth.signInWithPassword({
			email: validatedFields.data.email,
			password: validatedFields.data.password,
		})

		if (error) {
			throw new Error(getErrorMessage(error))
		}
	} catch (error: unknown) {
		return {
			error: getErrorMessage(error),
		}
	}
}

export async function logout() {
	const supabase = getSupabaseActionsClient()

	const { error } = await supabase.auth.signOut()

	if (error) {
		throw new Error(getErrorMessage(error))
	}

	return redirect('/')
}
