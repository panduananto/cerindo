import * as z from 'zod'

function hasMinimumLength(value: string) {
	return value.length >= 8
}

function hasUppercaseLetter(value: string) {
	return /[A-Z]/.test(value)
}

function hasLowercaseLetter(value: string) {
	return /[a-z]/.test(value)
}

function hasNumber(value: string) {
	return /[0-9]/.test(value)
}

function hasSpecialCharacter(value: string) {
	return /[!@#$%^&*]/.test(value)
}

export const validProviders = ['google', 'twitter', 'discord'] as const

export const oauthSchema = z.object({
	provider: z.enum(validProviders).refine((value) => validProviders.includes(value), {
		message: 'Invalid oauth provider',
	}),
})

export const authSchema = z.object({
	email: z.string().email({
		message: 'Please enter a valid email address',
	}),
	password: z
		.string()
		.refine((value) => hasMinimumLength(value), {
			message: 'Password must be at least 8 characters long',
		})
		.refine((value) => hasUppercaseLetter(value), {
			message: 'Password must contain at least one uppercase letter',
		})
		.refine((value) => hasLowercaseLetter(value), {
			message: 'Password must contain at least one lowercase letter',
		})
		.refine((value) => hasNumber(value), {
			message: 'Password must contain at least one number',
		})
		.refine((value) => hasSpecialCharacter(value), {
			message: 'Password must contain at least one special character',
		}),
})
