'use client'

import React from 'react'

import { useFormState } from 'react-dom'

import { resendEmailRegistration } from '@/lib/actions/auth'

import FormSubmitButton from '../form-submit-button'

type ResendEmailButtonProps = {
	email: string
}

const ResendEmailButton = ({ email }: ResendEmailButtonProps) => {
	const [formState, formAction] = useFormState(resendEmailRegistration, undefined)

	return (
		<form action={formAction}>
			<input hidden name="email" defaultValue={email} />
			<FormSubmitButton>Resend confirmation email</FormSubmitButton>
			{formState?.error && <p>{formState.error}</p>}
		</form>
	)
}

export default ResendEmailButton
