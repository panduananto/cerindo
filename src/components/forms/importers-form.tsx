'use client'

import React from 'react'

import { zodResolver } from '@hookform/resolvers/zod'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import * as z from 'zod'

import { updateImporter } from '@/lib/actions/importers'
import { getImporterById } from '@/lib/queries/importers'
import getSupabaseBrowserClient from '@/lib/supabase/client'
import { getErrorMessage } from '@/lib/utils'
import { importersSchema } from '@/lib/validations/skpabean'

import LoadingButton from '../loading-button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import Icons from '../ui/icons'
import { Input } from '../ui/input'
import { Textarea } from '../ui/textarea'

type Inputs = z.infer<typeof importersSchema>

const useImporterById = (id: string) => {
	const supabase = getSupabaseBrowserClient()
	const queryKey = ['importer-by-id', { id: id }]

	const queryFn = async () => {
		return getImporterById(supabase, id).then((result) => result.data)
	}

	return useQuery({ queryKey, queryFn })
}

const ImportersForm = ({ query }: { query: string }) => {
	const queryClient = useQueryClient()
	const { data: importer, isLoading, isError } = useImporterById(query)

	const form = useForm<Inputs>({
		mode: 'onTouched',
		resolver: zodResolver(importersSchema),
		defaultValues: {
			pic: '',
			picTitle: '',
			company: '',
			npwp: '',
			phone: '',
			address: '',
		},
		values: {
			pic: importer?.official_name ?? '',
			picTitle: importer?.official_title ?? '',
			company: importer?.company_name ?? '',
			npwp: importer?.npwp ?? '',
			phone: importer?.company_phone ?? '',
			address: importer?.company_address ?? '',
		},
	})

	if (isError) {
		toast.error('Oops!', {
			description: 'Something went wrong',
		})

		return
	}

	async function onSubmit(values: Inputs) {
		const validatedFields = importersSchema.safeParse(values)

		if (!validatedFields.success) {
			const errorMessage = getErrorMessage(validatedFields.error)

			toast.error('Oops!', {
				description: errorMessage,
			})

			return
		}

		const formData = new FormData()

		Object.entries(values).forEach(([key, value]) => {
			formData.append(key, value)
		})

		const response = await updateImporter(query, formData)

		if (response?.error) {
			toast.error('Oops!', {
				description: response.error,
			})

			return
		}

		toast.success('Sukses!', {
			description: 'Data importir berhasil diupdate!',
		})

		queryClient.invalidateQueries({ queryKey: ['importer-by-id', { id: query }] })
	}

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)}>
				<div className="grid grid-cols-6 gap-x-4 gap-y-6 p-6">
					<div className="col-span-3">
						<FormField
							control={form.control}
							name="pic"
							render={({ field }) => {
								return (
									<FormItem>
										<FormLabel htmlFor="pic">Nama Direksi *</FormLabel>
										<FormControl>
											<div className="relative w-full flex-1">
												{isLoading && (
													<div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
														<Icons.loader className="size-4 animate-spin" aria-hidden="true" />
													</div>
												)}
												<Input
													autoComplete="off"
													type="text"
													id="pic"
													placeholder="Masukkan nama direksi perusahaan importir..."
													{...field}
												/>
											</div>
										</FormControl>
										<FormMessage />
									</FormItem>
								)
							}}
						/>
					</div>
					<div className="col-span-3">
						<FormField
							control={form.control}
							name="picTitle"
							render={({ field }) => {
								return (
									<FormItem>
										<FormLabel htmlFor="picTitle">Jabatan Direksi *</FormLabel>
										<FormControl>
											<div className="relative w-full flex-1">
												{isLoading && (
													<div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
														<Icons.loader className="size-4 animate-spin" aria-hidden="true" />
													</div>
												)}
												<Input
													autoComplete="off"
													type="text"
													id="picTitle"
													placeholder="Masukkan jabatan direksi perusahaan importir..."
													{...field}
												/>
											</div>
										</FormControl>
										<FormMessage />
									</FormItem>
								)
							}}
						/>
					</div>
					<div className="col-span-6">
						<FormField
							control={form.control}
							name="company"
							render={({ field }) => {
								return (
									<FormItem>
										<FormLabel htmlFor="company">Nama Perusahaan *</FormLabel>
										<FormControl>
											<div className="relative w-full flex-1">
												{isLoading && (
													<div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
														<Icons.loader className="size-4 animate-spin" aria-hidden="true" />
													</div>
												)}
												<Input
													autoComplete="off"
													type="text"
													id="company"
													placeholder="Masukkan nama perusahaan importir..."
													{...field}
												/>
											</div>
										</FormControl>
										<FormMessage />
									</FormItem>
								)
							}}
						/>
					</div>
					<div className="col-span-3">
						<FormField
							control={form.control}
							name="npwp"
							render={({ field }) => {
								return (
									<FormItem>
										<FormLabel htmlFor="npwp">NPWP *</FormLabel>
										<FormControl>
											<div className="relative w-full flex-1">
												{isLoading && (
													<div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
														<Icons.loader className="size-4 animate-spin" aria-hidden="true" />
													</div>
												)}
												<Input
													autoComplete="off"
													type="text"
													id="npwp"
													placeholder="Masukkan npwp perusahaan importir..."
													{...field}
												/>
											</div>
										</FormControl>
										<FormMessage />
									</FormItem>
								)
							}}
						/>
					</div>
					<div className="col-span-3">
						<FormField
							control={form.control}
							name="phone"
							render={({ field }) => {
								return (
									<FormItem>
										<FormLabel htmlFor="phone">Nomor Telepon *</FormLabel>
										<FormControl>
											<div className="relative w-full flex-1">
												{isLoading && (
													<div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
														<Icons.loader className="size-4 animate-spin" aria-hidden="true" />
													</div>
												)}
												<Input
													autoComplete="off"
													type="text"
													id="phone"
													placeholder="Masukkan nomor telepon perusahaan importir..."
													{...field}
												/>
											</div>
										</FormControl>
										<FormMessage />
									</FormItem>
								)
							}}
						/>
					</div>
					<div className="col-span-6">
						<FormField
							control={form.control}
							name="address"
							render={({ field }) => {
								return (
									<FormItem>
										<FormLabel htmlFor="address">Alamat *</FormLabel>
										<FormControl>
											<div className="relative w-full flex-1">
												{isLoading && (
													<div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
														<Icons.loader className="size-4 animate-spin" aria-hidden="true" />
													</div>
												)}
												<Textarea
													autoComplete="off"
													id="address"
													placeholder="Masukkan alamat perusahaan importir"
													{...field}
													rows={4}
												/>
											</div>
										</FormControl>
										<FormMessage />
									</FormItem>
								)
							}}
						/>
					</div>
				</div>
				<div className="flex justify-end space-x-2 border-t border-border p-4">
					<LoadingButton type="submit" loading={form.formState.isSubmitting}>
						Update
					</LoadingButton>{' '}
				</div>
			</form>
		</Form>
	)
}

export default ImportersForm
