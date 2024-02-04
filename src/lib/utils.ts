import { clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'
import * as z from 'zod'

import type { ClassValue } from 'clsx'

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

export function clamp(number: number, min: number, max: number) {
	return Math.min(Math.max(number, min), max)
}

export function chunk<T>(array: T[], perChunk: number) {
	return array.reduce((acc: T[][], item: T, index: number) => {
		const chunkIndex = Math.floor(index / perChunk)

		if (!acc[chunkIndex]) {
			acc[chunkIndex] = []
		}

		acc[chunkIndex]?.push(item)

		return acc
	}, [])
}

export function getErrorMessage(error: unknown): string {
	let message: string

	if (error instanceof Error) {
		message = error.message
	} else if (error instanceof z.ZodError) {
		const errors = error.issues.map((issue) => {
			return issue.message
		})

		message = errors.join('\n')
	} else if (error && typeof error === 'object' && 'message' in error) {
		message = String(error.message)
	} else if (typeof error === 'string') {
		message = error
	} else {
		message = 'Something went wrong'
	}

	return message
}

export function getHash(): string | undefined {
	return typeof window !== 'undefined' ? decodeURIComponent(window.location.hash.replace('#', '')) : undefined
}
