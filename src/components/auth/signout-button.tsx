'use client'

import React, { useTransition } from 'react'

import { logout } from '@/lib/actions/auth'
import { cn } from '@/lib/utils'

import Icons from '../ui/icons'

const SignoutButton = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement>>(
	({ className, disabled, ...props }, ref) => {
		const [isPending, startTransition] = useTransition()

		return (
			<button
				className={cn(className)}
				disabled={isPending || disabled}
				{...props}
				onClick={() => {
					startTransition(() => {
						logout()
					})
				}}
				ref={ref}
			>
				{isPending ? (
					<Icons.loader className="mr-2 size-4 animate-spin" aria-hidden="true" />
				) : (
					<Icons.logout className="mr-2 size-4" aria-hidden="true" />
				)}
				Log out
			</button>
		)
	},
)

export default SignoutButton
