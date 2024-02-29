import React from 'react'
import { Metadata } from 'next'
import Link from 'next/link'

import { env } from '@/env.mjs'

import { rubik } from '@/config/font'

import OAuthSignIn from '@/components/auth/oauth-signin'
import RegisterForm from '@/components/forms/register-form'
import Logo from '@/components/logo'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import Icons from '@/components/ui/icons'

export const metadata: Metadata = {
	metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
	title: 'Registration',
	description: 'Register for an account',
}

export default async function RegisterPage() {
	return (
		<section className="container mx-auto flex h-full max-w-lg flex-col items-start justify-center rounded-lg px-0">
			<div className="inline-flex flex-col items-start">
				<Link href="/" className="mb-4 inline-flex items-center text-sm hover:underline hover:underline-offset-4">
					<Icons.arrowLeft className="mr-2 size-5 text-secondary-foreground" />
					Go back to homepage
				</Link>
			</div>
			<Card className="mt-4 w-full">
				<CardHeader>
					<Logo className="mb-4 inline-block" />
					<CardTitle className={`${rubik.className} text-3xl font-bold leading-tight tracking-tight`}>
						Registration
					</CardTitle>{' '}
					<CardDescription>Choose your preferred registration method</CardDescription>
				</CardHeader>
				<CardContent className="grid gap-4">
					<OAuthSignIn />
					<div className="relative">
						<div className="absolute inset-0 flex items-center">
							<span className="w-full border-t" />
						</div>
						<div className="relative flex justify-center text-xs uppercase">
							<span className="bg-white px-2 text-muted-foreground">Or continue with</span>
						</div>
					</div>
					<RegisterForm />
				</CardContent>
				<CardFooter className="text-sm">
					<p className="text-muted-foreground">
						Already have an account?{' '}
						<Link aria-label="Sign up" href="/signin" className="font-medium text-secondary-foreground hover:underline">
							Sign in
						</Link>
					</p>
				</CardFooter>
			</Card>
		</section>
	)
}
