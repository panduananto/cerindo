import React from 'react'
import { Metadata } from 'next'
import Link from 'next/link'
import { redirect } from 'next/navigation'

import { env } from '@/env.mjs'

import { rubik } from '@/config/font'
import { getSupabaseServerClient } from '@/lib/supabase/server'

import OAuthSignIn from '@/components/auth/oauth-signin'
import SignInForm from '@/components/forms/signin-form'
import Logo from '@/components/logo'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import Icons from '@/components/ui/icons'

export const metadata: Metadata = {
	metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
	title: 'Sign in',
	description: 'Sign in to your account',
}

export default async function SignInPage() {
	const supabase = getSupabaseServerClient()

	const {
		data: { user },
	} = await supabase.auth.getUser()

	if (user) {
		redirect('/')
	}

	return (
		<section className="container mx-auto flex h-full max-w-lg flex-col items-start justify-center rounded-lg px-0">
			<div className="inline-flex flex-col items-start">
				<Link href="/" className="mb-4 inline-flex items-center text-sm hover:underline hover:underline-offset-4">
					<Icons.arrowLeft className="mr-2 size-5 text-slate-900" />
					Go back to homepage
				</Link>
			</div>
			<Card className="mt-4 w-full">
				<CardHeader>
					<Logo className="mb-4 inline-block" />
					<CardTitle className={`${rubik.className} text-3xl font-bold leading-tight tracking-tight`}>
						Sign in
					</CardTitle>
					<CardDescription>Choose your preferred sign in method</CardDescription>
				</CardHeader>
				<CardContent className="grid gap-4">
					<OAuthSignIn />
					<div className="relative">
						<div className="absolute inset-0 flex items-center">
							<span className="w-full border-t" />
						</div>
						<div className="relative flex justify-center text-xs uppercase">
							<span className="bg-white px-2 text-slate-500">Or continue with</span>
						</div>
					</div>
					<SignInForm />
				</CardContent>
				<CardFooter className="flex justify-between text-sm">
					<p className="text-slate-500">
						Don't have an account?{' '}
						<Link aria-label="Sign up" href="/register" className="font-medium text-slate-900 hover:underline">
							Sign up
						</Link>
					</p>
					<Link
						aria-label="Reset password"
						href="/account/reset-password"
						className="font-medium text-slate-900 hover:underline"
					>
						Reset password
					</Link>
				</CardFooter>
			</Card>
		</section>
	)
}
