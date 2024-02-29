'use client'

import React from 'react'

import FileSaver from 'file-saver'
import JSZip from 'jszip'
import { toast } from 'sonner'
import { utils, writeFile } from 'xlsx'

import { clearAll, selectAllAkl, selectDistinctAkl } from '@/lib/store/features/akl/akl-slice'
import { useAppDispatch, useAppSelector } from '@/lib/store/store'
import getSupabaseBrowserClient from '@/lib/supabase/client'
import { getErrorMessage } from '@/lib/utils'

import { Button } from './ui/button'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from './ui/dropdown-menu'
import Icons from './ui/icons'

const excelConfig = {
	date: {
		options: {
			year: 'numeric',
			month: '2-digit',
			day: '2-digit',
		} as Intl.DateTimeFormatOptions,
	},
	header: {
		akl: [['NOMOR', 'KODE AKL', 'TANGGAL TERBIT', 'TANGGAL KADALUARSA']],
		items: [
			[
				'NOMOR',
				'NEGARA ASAL',
				'MEREK',
				'NAMA DAGANG',
				'KEMASAN',
				'HS CODE',
				'BM',
				'PPN',
				'PPH-API',
				'PPH-NONAPI',
				'LARTAS',
				'FASILITAS',
				'AKL',
			],
		],
	},
}

const formatDate = (date: string | undefined | null) => {
	return !date ? 'TANGGAL TIDAK TERTERA' : new Date(date).toLocaleDateString('id', excelConfig.date.options)
}

const AklTableFooter = () => {
	const dispatch = useAppDispatch()
	const allAkl = useAppSelector(selectAllAkl)
	const distinctAkl = useAppSelector(selectDistinctAkl)

	const handleExportToExcel = () => {
		const workbook = utils.book_new()

		if (allAkl.length === 0 || distinctAkl.length === 0) {
			toast.error('Oops!', {
				description: 'Barang atau dokumen AKL masih kosong',
			})

			return
		}

		const itemsRows = allAkl.map((item, index) => {
			return {
				number: index + 1,
				countryCode: item.countries.code,
				type: item.type,
				brandName: item.brand_name,
				packaging: `KEMASAN : ${item.packaging}`,
				hsCode: item.hscode.code,
				importDutyFees: item.hscode.import_dutyfees,
				valueAddedTax: item.hscode.value_added_tax,
				incomeTaxApi: item.hscode.income_tax_api,
				incomeTaxNonApi: item.hscode.income_tax_non_api,
				lartas: item.hscode.lartas,
				facility: item.facility,
				aklCode: item.id_akl.split('_').join(' '),
			}
		})
		const aklRows = distinctAkl.map((item, index) => {
			return {
				number: index + 1,
				aklCode: item.id_akl.split('_').join(' '),
				date: formatDate(item.date),
				expiryDate: formatDate(item.expiry_date),
			}
		})

		const itemsWorksheet = utils.json_to_sheet(itemsRows)
		const aklWorksheet = utils.json_to_sheet(aklRows)

		utils.book_append_sheet(workbook, itemsWorksheet, 'BARANG')
		utils.book_append_sheet(workbook, aklWorksheet, 'AKL')

		utils.sheet_add_aoa(itemsWorksheet, excelConfig.header.items, { origin: 'A1' })
		utils.sheet_add_aoa(aklWorksheet, excelConfig.header.akl, { origin: 'A1' })

		writeFile(workbook, 'TABEL_BARANG.xlsx')
	}

	const handleDownloadAklFile = async (url: string): Promise<Blob | null> => {
		const supabase = getSupabaseBrowserClient()

		const { data, error } = await supabase.storage.from('cerindo').download(`akl/${url}`)

		if (error) {
			throw new Error(getErrorMessage(error))
		}

		return data
	}

	const handleZippingAkl = async () => {
		if (distinctAkl.length === 0) {
			toast.error('Oops!', {
				description: 'Dokumen AKL masih kosong',
			})

			return
		}

		const zip = new JSZip()

		const requests = Array.from(distinctAkl).map((akl) => {
			if (!akl.file_url) {
				const aklIdFormatted = akl.id_akl.split('_').join(' ')

				toast.error('Oops!', {
					description: `Berkas ${aklIdFormatted} rusak`,
				})

				return
			}

			return handleDownloadAklFile(akl.file_url).then((file) => {
				return {
					id: akl.id_akl,
					data: file,
				}
			})
		})

		toast.promise(
			Promise.all(requests)
				.then((pdfs) =>
					pdfs.map((pdf) => {
						zip.file(`${pdf?.id}.pdf`, pdf?.data!, { binary: true })
						return null
					}),
				)
				.then(() =>
					zip.generateAsync({ type: 'blob' }).then((content) => {
						FileSaver.saveAs(content, 'AKL.zip')
					}),
				),
			{
				loading: 'Mengunduh dokumen AKL...',
				success: 'Dokumen AKL berhasil diunduh',
				error: 'Maaf, ada kesalahan. Silahkan coba lagi',
			},
		)
	}

	return (
		<div className="mt-auto flex items-center justify-between border-t border-slate-300 bg-background px-4 py-3 sm:px-6 lg:px-8">
			<p className="shrink-0 text-[13px] text-slate-700">
				<span className="font-extrabold">{allAkl.length}</span> barang dan{' '}
				<span className="font-extrabold">{distinctAkl.length}</span> izin AKL terpilih
			</p>
			<div className="block 2md:hidden">
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="ghost" size="icon">
							<Icons.moreVertical className="size-4" />
							<span className="sr-only">Open table footer menu</span>
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent className="w-56" align="end" forceMount>
						<DropdownMenuGroup>
							<DropdownMenuItem>
								<Icons.fileDown className="mr-2 size-4" />
								Export excel &#40;xlsx&#41;
							</DropdownMenuItem>
							<DropdownMenuItem>
								<Icons.fileArchive className="mr-2 size-4" />
								Download AKL &#40;zip&#41;
							</DropdownMenuItem>
						</DropdownMenuGroup>
						<DropdownMenuSeparator />
						<DropdownMenuGroup>
							<DropdownMenuItem className="hover:text-primary">Reset tabel</DropdownMenuItem>
						</DropdownMenuGroup>
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
			<div className="hidden 2md:flex 2md:items-center">
				<div className="flex items-center space-x-2">
					<Button
						variant="outline"
						disabled={allAkl.length === 0 ? true : false}
						className="h-max px-2 py-1 text-[13px]"
						onClick={handleExportToExcel}
					>
						Export &#40;xlsx&#41;
					</Button>
					<Button
						variant="outline"
						disabled={distinctAkl.length === 0 ? true : false}
						className="h-max px-2 py-1 text-[13px]"
						onClick={handleZippingAkl}
					>
						Download &#40;zip&#41;
					</Button>
				</div>
				<span className="mx-2">|</span>
				<Button variant="destructive" className="h-max px-2 py-1 text-[13px]" onClick={() => dispatch(clearAll())}>
					Reset tabel
				</Button>
			</div>
		</div>
	)
}

export default AklTableFooter
