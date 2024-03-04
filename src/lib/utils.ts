import { ReadonlyURLSearchParams } from 'next/navigation'

import { clsx } from 'clsx'
import { Paragraph, TableCell, TableRow, TextRun } from 'docx'
import { twMerge } from 'tailwind-merge'
import * as z from 'zod'

import type { TableData } from '@/types'
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

export function createUrl(pathname: string, params: URLSearchParams | ReadonlyURLSearchParams) {
	const paramsString = params.toString()
	const queryString = `${paramsString.length ? '?' : ''}${paramsString}`

	return `${pathname}${queryString}`
}

export function generateTableRow(tableRow: TableData) {
	return Object.values(tableRow.rows).map((items) => {
		return new TableRow({
			...(tableRow.options && { ...tableRow.options }),
			children: [
				...items.map((row) => {
					return new TableCell({
						...(row.options && { ...row.options }),
						width: {
							size: row.width.size,
							type: row.width.type,
						},
						children: [
							new Paragraph({
								...(row.options?.text && { ...row.options.text }),
								children: [
									new TextRun({
										text: row.children.text,
										...(row.children.options && { ...row.children.options }),
									}),
								],
							}),
						],
					})
				}),
			],
		})
	})
}

export function deepEqual(obj1: any, obj2: any): boolean {
	// Check if both arguments are objects
	if (typeof obj1 !== 'object' || typeof obj2 !== 'object') {
		return obj1 === obj2 // If they're not objects, perform simple equality check
	}

	// Check if both objects are null (since typeof null === 'object')
	if (obj1 === null && obj2 === null) {
		return true
	}

	// Check if only one of the objects is null
	if (obj1 === null || obj2 === null) {
		return false
	}

	// Get the keys of both objects
	const obj1Keys = Object.keys(obj1)
	const obj2Keys = Object.keys(obj2)

	// Check if the number of keys is the same
	if (obj1Keys.length !== obj2Keys.length) {
		return false
	}

	// Recursively compare the values of each property
	for (const key of obj1Keys) {
		if (!obj2.hasOwnProperty(key) || !deepEqual(obj1[key], obj2[key])) {
			return false
		}
	}

	return true // If all checks pass, the objects are deeply equal
}
