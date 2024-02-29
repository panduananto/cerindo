import React, { Suspense } from 'react'
import { redirect } from 'next/navigation'

import { env } from '@/env.mjs'

import { getSupabaseServerClient } from '@/lib/supabase/server'

import ImportersForm from '@/components/forms/importers-form'
import ShipmentForm from '@/components/forms/shipment-form'
import ImportersList from '@/components/importers-list'
import ImportersSearchBar from '@/components/importers-search-bar'
import SkpabeanFooter from '@/components/skpabean-footer'
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
		data: { user },
	} = await supabase.auth.getUser()

	if (!user) {
		redirect('/signin')
	}

	const { search, query } = searchParams as { [key: string]: string }

	return (
		<div className="flex h-full min-h-full overflow-hidden">
			<div className="relative flex w-full min-w-0 flex-auto flex-col bg-background lg:min-w-[350px] lg:max-w-[350px]">
				<div className="flex flex-[0_0_auto] flex-col border-b bg-secondary px-8 py-4">
					<ImportersSearchBar />
				</div>
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
								<div className="mt-5 rounded border border-border bg-background">
									{!query ? (
										<div className="rounded-md border-2 border-dashed border-border p-4 text-center">
											<p className="text-sm font-medium"> Silahkan pilih importir di sebelah kiri</p>
										</div>
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
				<SkpabeanFooter />
			</div>
		</div>
	)
}
