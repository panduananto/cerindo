'use client'

import React, { useEffect } from 'react'

import { useFormState } from 'react-dom'
import * as z from 'zod'

import { registerWithOauth } from '@/lib/actions/auth'

import { Button } from '../ui/button'
import Icons from '../ui/icons'

import type { oauthSchema } from '@/lib/validations/auth'

type OAuthStrategy = z.TypeOf<typeof oauthSchema>['provider']

const oauthProvider = [{ name: 'google', icon: 'google' }] satisfies {
	name: OAuthStrategy
	icon: keyof typeof Icons
}[]

const OAuthSignIn = () => {
	const [formState, formAction] = useFormState(registerWithOauth, undefined)

	return (
		<div className="grid grid-cols-1 gap-2">
			{oauthProvider.map((provider) => {
				const Icon = Icons[provider.icon]

				return (
					<form action={formAction} key={`oauth-${provider.name}`}>
						<input hidden name="provider" defaultValue={provider.name} />
						<Button variant="outline" aria-label={`Sign in with ${provider.name}`} className="w-full capitalize">
							<Icon className="mr-2 size-4" />
							{provider.name}
						</Button>
					</form>
				)
			})}
		</div>
	)
}

export default OAuthSignIn
