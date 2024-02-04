import React from 'react'
import { Metadata } from 'next'
import Link from 'next/link'

import { env } from '@/env.mjs'

import ResendEmailButton from '@/components/auth/resend-email-button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'

interface VerifyEmailPageProps {
	searchParams: { [key: string]: string | undefined }
}

export const metadata: Metadata = {
	metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
	title: 'Verify email',
	description: 'Check out your email to verify account email',
}

export default async function VerifyEmailPage({ searchParams }: VerifyEmailPageProps) {
	return (
		<section className="container mx-auto flex h-full max-w-lg flex-col items-start justify-center rounded-lg px-0">
			<Link aria-label="Home" href="/" className="text-4xl font-bold text-primary">
				cerindo
			</Link>
			<Card className="mt-4 w-full">
				<CardHeader>
					<CardTitle>Confirm your account</CardTitle>
				</CardHeader>
				<CardContent className="grid gap-4">
					Confirmation link has been sent to your email. Please verify your email address to complete your account
					registration
				</CardContent>
				<CardFooter>
					<ResendEmailButton email={searchParams.email!} />
				</CardFooter>
			</Card>
		</section>
	)
}
