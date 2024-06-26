import React, { Suspense } from 'react'
import { redirect } from 'next/navigation'

import { env } from '@/env'

import { getSupabaseServerClient } from '@/lib/supabase/server'
import { cn } from '@/lib/utils'

import ImportersForm from '@/components/forms/importers-form'
import ShipmentForm from '@/components/forms/shipment-form'
import ImportersList from '@/components/importers-list'
import ImportersSearchBar from '@/components/importers-search-bar'
import SKPabeanFooter from '@/components/skpabean-footer'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Skeleton } from '@/components/ui/skeleton'

import type { Metadata } from 'next'

export const metadata: Metadata = {
	metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
	title: 'Cerindo | Dashboard',
	description: "Cerindo's powerful dashboard for efficient task management and insightful analytics",
}

type SkpabeanPageProps = {
	searchParams?: { [key: string]: string | string[] | undefined }
}

export default async function SkpabeanPage({ searchParams }: SkpabeanPageProps) {
	const supabase = getSupabaseServerClient()

	const {
		data: { session },
	} = await supabase.auth.getSession()

	if (!session?.user) {
		redirect('/signin')
	}

	const { search, query } = searchParams as { [key: string]: string }

	return (
		<div className="flex h-full min-h-full flex-col overflow-hidden xl:flex-row">
			<div className="relative flex w-full min-w-0 flex-auto flex-col bg-background xl:min-w-[350px] xl:max-w-[350px]">
				<div className="flex flex-[0_0_auto] flex-col border-b bg-secondary px-8 py-4 xl:p-0">
					<div className="relative">
						<div className="relative w-full flex-1 p-0 xl:border-b xl:px-8 xl:py-4">
							<ImportersSearchBar />
						</div>
						<div
							className={cn(
								!search || search === ''
									? 'hidden xl:block'
									: 'absolute left-1/2 top-12 z-50 block w-full -translate-x-1/2 rounded-lg border bg-white shadow-lg xl:top-auto xl:z-0 xl:rounded-none xl:border-b xl:border-none xl:shadow-none',
								'bg-white',
							)}
						>
							<ScrollArea type="auto">
								<Suspense
									fallback={
										<div className="flex flex-col items-start space-y-2 px-8 py-5">
											<Skeleton className="h-3 w-full" />
											<Skeleton className="h-3 w-40" />
										</div>
									}
								>
									<ImportersList search={search ?? ''} />
								</Suspense>
							</ScrollArea>
						</div>
					</div>
				</div>
			</div>
			<div className="flex flex-auto flex-col overflow-y-auto border-l bg-muted">
				<ScrollArea type="auto">
					<div className="flex flex-auto shrink flex-col p-8">
						<h1 className="text-xl font-semibold leading-8 sm:text-2xl 2md:text-3xl">
							Pembuatan Dokumen Surat Keputusan Pabean
						</h1>
						<p className="mt-1 font-normal text-slate-700">
							Buat dokumen Surat Keputusan Pabean yang Anda butuhkan dengan mudah
						</p>
						<div className="mt-4 space-y-4">
							<div className="flex flex-col">
								<div className="text-left">
									<h2 className="font-semibold leading-8">Perusahaan Importir</h2>
									<p className="text-sm text-slate-600">
										Pengisian data perusahaan importir, harap pastikan data yang diisi adalah benar.
									</p>
								</div>
								<div
									className={cn(
										'mt-5 rounded border-border bg-background',
										query ? 'border' : 'border-2 border-dashed p-4',
									)}
								>
									{!query ? (
										<p className="text-center text-sm font-medium"> Silahkan pilih importir di sebelah kiri</p>
									) : (
										<ImportersForm query={query} />
									)}
								</div>
							</div>
							<div className="hidden sm:block">
								<div className="py-5">
									<div className="border-t border-border"></div>
								</div>
							</div>
							<div className="flex flex-col">
								<div className="text-left">
									<h2 className="font-semibold leading-8">Shipment</h2>
									<p className="text-sm text-slate-600">
										Pengisian data shipment, harap pastikan data yang diisi adalah benar.
									</p>
								</div>
								<div className="mt-5 rounded border border-border bg-background">
									<ShipmentForm />
								</div>
							</div>
						</div>
					</div>
				</ScrollArea>
				<SKPabeanFooter />
			</div>
		</div>
	)
}
