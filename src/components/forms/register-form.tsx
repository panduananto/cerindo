'use client'

import React from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import * as z from 'zod'

import { registerWithEmail } from '@/lib/actions/auth'
import { getErrorMessage } from '@/lib/utils'
import { authSchema } from '@/lib/validations/auth'

import LoadingButton from '../loading-button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Input } from '../ui/input'

type Inputs = z.infer<typeof authSchema>

const RegisterForm = () => {
	const form = useForm<Inputs>({
		mode: 'onTouched',
		resolver: zodResolver(authSchema),
		defaultValues: {
			email: '',
			password: '',
		},
	})

	async function onSubmit(values: Inputs) {
		const validatedFields = authSchema.safeParse(values)

		if (!validatedFields.success) {
			const errorMessage = getErrorMessage(validatedFields.error)

			toast.custom((t) => {
				return (
					<div>
						<h1>Oops!</h1>
						<p>{errorMessage}</p>
					</div>
				)
			})

			return
		}

		const formData = new FormData()

		Object.entries(values).forEach(([key, value]) => {
			formData.append(key, value)
		})

		const response = await registerWithEmail(formData)

		if (response?.error) {
			toast.custom((t) => {
				return (
					<div>
						<h1>Oops!</h1>
						<p>{response.error}</p>
					</div>
				)
			})

			return
		}
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
				<FormField
					control={form.control}
					name="email"
					render={({ field }) => {
						return (
							<FormItem>
								<FormLabel>Email</FormLabel>
								<FormControl>
									<Input type="email" placeholder="youremail@emailservice.com" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)
					}}
				/>
				<FormField
					control={form.control}
					name="password"
					render={({ field }) => {
						return (
							<FormItem>
								<FormLabel>Password</FormLabel>
								<FormControl>
									<Input type="password" placeholder="********" {...field} />
								</FormControl>
								<FormMessage />
							</FormItem>
						)
					}}
				/>
				<LoadingButton type="submit" loading={form.formState.isSubmitting} className="w-full">
					Register
				</LoadingButton>
			</form>
		</Form>
	)
}

export default RegisterForm
