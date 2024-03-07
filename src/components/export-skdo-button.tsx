'use client'

import React from 'react'

import { format } from 'date-fns'
import {
	AlignmentType,
	Document,
	Packer,
	Paragraph,
	Table,
	TableCell,
	TableLayoutType,
	TableRow,
	TextRun,
	UnderlineType,
	VerticalAlign,
	WidthType,
} from 'docx'
import { saveAs } from 'file-saver'
import { toast } from 'sonner'

import { selectImporter, selectShipment } from '@/lib/store/features/skp/skp-slice'
import { useAppSelector } from '@/lib/store/store'
import { generateTableRow } from '@/lib/utils'

import { DropdownMenuItem } from './ui/dropdown-menu'

const ExportSKDOButton = () => {
	const importer = useAppSelector(selectImporter)
	const shipment = useAppSelector(selectShipment)

	function handleDownloadSKDODocument() {
		if (!importer || !shipment) {
			toast.error('Oops!', {
				description: 'Data importir atau shipment belum lengkap',
			})

			return
		}

		const importerTable = {
			rows: {
				pic: [
					{
						width: { size: 5, type: WidthType.PERCENTAGE },
						children: { text: '', options: { size: 24 } },
					},
					{
						width: { size: 20, type: WidthType.PERCENTAGE },
						children: { text: 'Nama', options: { size: 24 } },
					},
					{
						options: { verticalAlign: VerticalAlign.TOP, text: { alignment: AlignmentType.CENTER } },
						width: { size: 5, type: WidthType.PERCENTAGE },
						children: { text: ':', options: { size: 24 } },
					},
					{
						width: { size: 70, type: WidthType.PERCENTAGE },
						children: { text: importer.pic, options: { size: 24 } },
					},
				],
				picTitle: [
					{
						width: { size: 5, type: WidthType.PERCENTAGE },
						children: { text: '', options: { size: 24 } },
					},
					{
						width: { size: 20, type: WidthType.PERCENTAGE },
						children: { text: 'Jabatan', options: { size: 24 } },
					},
					{
						options: { verticalAlign: VerticalAlign.TOP, text: { alignment: AlignmentType.CENTER } },
						width: { size: 5, type: WidthType.PERCENTAGE },
						children: { text: ':', options: { size: 24 } },
					},
					{
						width: { size: 70, type: WidthType.PERCENTAGE },
						children: { text: importer.picTitle, options: { size: 24 } },
					},
				],
				company: [
					{
						width: { size: 5, type: WidthType.PERCENTAGE },
						children: { text: '', options: { size: 24 } },
					},
					{
						width: { size: 20, type: WidthType.PERCENTAGE },
						children: { text: 'Perusahaan', options: { size: 24 } },
					},
					{
						options: { verticalAlign: VerticalAlign.TOP, text: { alignment: AlignmentType.CENTER } },
						width: { size: 5, type: WidthType.PERCENTAGE },
						children: { text: ':', options: { size: 24 } },
					},
					{
						width: { size: 70, type: WidthType.PERCENTAGE },
						children: { text: importer.company, options: { size: 24 } },
					},
				],
				npwp: [
					{
						width: { size: 5, type: WidthType.PERCENTAGE },
						children: { text: '', options: { size: 24 } },
					},
					{
						width: { size: 20, type: WidthType.PERCENTAGE },
						children: { text: 'NPWP', options: { size: 24 } },
					},
					{
						options: { verticalAlign: VerticalAlign.TOP, text: { alignment: AlignmentType.CENTER } },
						width: { size: 5, type: WidthType.PERCENTAGE },
						children: { text: ':', options: { size: 24 } },
					},
					{
						width: { size: 70, type: WidthType.PERCENTAGE },
						children: { text: importer.npwp, options: { size: 24 } },
					},
				],
				address: [
					{
						width: { size: 5, type: WidthType.PERCENTAGE },
						children: { text: '', options: { size: 24 } },
					},
					{
						width: { size: 20, type: WidthType.PERCENTAGE },
						children: { text: 'Alamat', options: { size: 24 } },
					},
					{
						options: { verticalAlign: VerticalAlign.TOP, text: { alignment: AlignmentType.CENTER } },
						width: { size: 5, type: WidthType.PERCENTAGE },
						children: { text: ':', options: { size: 24 } },
					},
					{
						width: { size: 70, type: WidthType.PERCENTAGE },
						children: { text: importer.address, options: { size: 24 } },
					},
				],
				...(shipment.shipmentType === 'sea' && {
					phone: [
						{
							width: { size: 5, type: WidthType.PERCENTAGE },
							children: { text: '', options: { size: 24 } },
						},
						{
							width: { size: 20, type: WidthType.PERCENTAGE },
							children: { text: 'No. Tlp.', options: { size: 24 } },
						},
						{
							options: { verticalAlign: VerticalAlign.TOP, text: { alignment: AlignmentType.CENTER } },
							width: { size: 5, type: WidthType.PERCENTAGE },
							children: { text: ':', options: { size: 24 } },
						},
						{
							width: { size: 70, type: WidthType.PERCENTAGE },
							children: { text: importer.phone, options: { size: 24 } },
						},
					],
				}),
			},
		}

		const ppjkTable = {
			rows: {
				company: [
					{
						width: { size: 5, type: WidthType.PERCENTAGE },
						children: { text: '', options: { size: 24 } },
					},
					{
						width: { size: 20, type: WidthType.PERCENTAGE },
						children: { text: 'Nama PPJK', options: { size: 24 } },
					},
					{
						options: { verticalAlign: VerticalAlign.TOP, text: { alignment: AlignmentType.CENTER } },
						width: { size: 5, type: WidthType.PERCENTAGE },
						children: { text: ':', options: { size: 24 } },
					},
					{
						width: { size: 70, type: WidthType.PERCENTAGE },
						children: { text: 'PT. Cerindo Prima Logistik', options: { size: 24 } },
					},
				],
				npwp: [
					{
						width: { size: 5, type: WidthType.PERCENTAGE },
						children: { text: '', options: { size: 24 } },
					},
					{
						width: { size: 20, type: WidthType.PERCENTAGE },
						children: { text: 'NPWP', options: { size: 24 } },
					},
					{
						options: { verticalAlign: VerticalAlign.TOP, text: { alignment: AlignmentType.CENTER } },
						width: { size: 5, type: WidthType.PERCENTAGE },
						children: { text: ':', options: { size: 24 } },
					},
					{
						width: { size: 70, type: WidthType.PERCENTAGE },
						children: { text: '02.444.890.4-005.000', options: { size: 24 } },
					},
				],
				address: [
					{
						width: { size: 5, type: WidthType.PERCENTAGE },
						children: { text: '', options: { size: 24 } },
					},
					{
						width: { size: 20, type: WidthType.PERCENTAGE },
						children: { text: 'Alamat', options: { size: 24 } },
					},
					{
						options: { verticalAlign: VerticalAlign.TOP, text: { alignment: AlignmentType.CENTER } },
						width: { size: 5, type: WidthType.PERCENTAGE },
						children: { text: ':', options: { size: 24 } },
					},
					{
						width: { size: 70, type: WidthType.PERCENTAGE },
						children: {
							text: 'Jalan Seulawah Raya Kompl. Puri Sentra Niaga B-37 LT.1 RT.12 RW.07 Cipinang Melayu, Makasar, Jakarta Timur',
							options: { size: 24 },
						},
					},
				],
				pic: [
					{
						width: { size: 5, type: WidthType.PERCENTAGE },
						children: { text: '', options: { size: 24 } },
					},
					{
						width: { size: 20, type: WidthType.PERCENTAGE },
						children: { text: 'Nama', options: { size: 24 } },
					},
					{
						options: { verticalAlign: VerticalAlign.TOP, text: { alignment: AlignmentType.CENTER } },
						width: { size: 5, type: WidthType.PERCENTAGE },
						children: { text: ':', options: { size: 24 } },
					},
					{
						width: { size: 70, type: WidthType.PERCENTAGE },
						children: {
							text: shipment.shipmentType === 'sea' ? 'Eka Susilo' : 'Gino / Dendi Ariawan',
							options: { size: 24 },
						},
					},
				],
				picTitle: [
					{
						width: { size: 5, type: WidthType.PERCENTAGE },
						children: { text: '', options: { size: 24 } },
					},
					{
						width: { size: 20, type: WidthType.PERCENTAGE },
						children: { text: 'Jabatan', options: { size: 24 } },
					},
					{
						options: { verticalAlign: VerticalAlign.TOP, text: { alignment: AlignmentType.CENTER } },
						width: { size: 5, type: WidthType.PERCENTAGE },
						children: { text: ':', options: { size: 24 } },
					},
					{
						width: { size: 70, type: WidthType.PERCENTAGE },
						children: {
							text: shipment.shipmentType === 'sea' ? 'Manager Operasional' : 'Staff Ops',
							options: { size: 24 },
						},
					},
				],
			},
		}

		const shipmentTable = {
			rows: {
				consignee: [
					{
						width: { size: 5, type: WidthType.PERCENTAGE },
						children: { text: '', options: { size: 24 } },
					},
					{
						width: { size: 20, type: WidthType.PERCENTAGE },
						children: { text: 'Pemasok', options: { size: 24 } },
					},
					{
						options: { verticalAlign: VerticalAlign.TOP, text: { alignment: AlignmentType.CENTER } },
						width: { size: 5, type: WidthType.PERCENTAGE },
						children: { text: ':', options: { size: 24 } },
					},
					{
						options: { columnSpan: 2 },
						width: { size: 70, type: WidthType.PERCENTAGE },
						children: { text: importer.company.toUpperCase(), options: { size: 24 } },
					},
				],
				goodsDescription: [
					{
						width: { size: 5, type: WidthType.PERCENTAGE },
						children: { text: '', options: { size: 24 } },
					},
					{
						width: { size: 20, type: WidthType.PERCENTAGE },
						children: { text: 'Nama Barang', options: { size: 24 } },
					},
					{
						options: { verticalAlign: VerticalAlign.TOP, text: { alignment: AlignmentType.CENTER } },
						width: { size: 5, type: WidthType.PERCENTAGE },
						children: { text: ':', options: { size: 24 } },
					},
					{
						options: { columnSpan: 2 },
						width: { size: 70, type: WidthType.PERCENTAGE },
						children: { text: shipment.goods.toUpperCase(), options: { size: 24 } },
					},
				],
				containerNumber: [
					{
						width: { size: 5, type: WidthType.PERCENTAGE },
						children: { text: '', options: { size: 24 } },
					},
					{
						width: { size: 20, type: WidthType.PERCENTAGE },
						children: { text: shipment.shipmentType === 'sea' ? 'Party / Cont' : 'Party / GW', options: { size: 24 } },
					},
					{
						options: { verticalAlign: VerticalAlign.TOP, text: { alignment: AlignmentType.CENTER } },
						width: { size: 5, type: WidthType.PERCENTAGE },
						children: { text: ':', options: { size: 24 } },
					},
					{
						options: { columnSpan: 2 },
						width: { size: 70, type: WidthType.PERCENTAGE },
						children: { text: shipment.containerSerial!.toUpperCase(), options: { size: 24 } },
					},
				],
				vesselAndETA: [
					{
						width: { size: 5, type: WidthType.PERCENTAGE },
						children: { text: '', options: { size: 24 } },
					},
					{
						width: { size: 20, type: WidthType.PERCENTAGE },
						children: { text: shipment.shipmentType === 'sea' ? 'Vessel/ETA' : 'Flight', options: { size: 24 } },
					},
					{
						options: { verticalAlign: VerticalAlign.TOP, text: { alignment: AlignmentType.CENTER } },
						width: { size: 5, type: WidthType.PERCENTAGE },
						children: { text: ':', options: { size: 24 } },
					},
					{
						...(shipment.shipmentType === 'air' && { options: { columnSpan: 2 } }),
						width: { size: shipment.shipmentType === 'sea' ? 50 : 70, type: WidthType.PERCENTAGE },
						children: {
							text: shipment.vessel.toUpperCase(),
							options: { size: 24 },
						},
					},
					...(shipment.shipmentType === 'sea'
						? [
								{
									width: { size: 20, type: WidthType.PERCENTAGE },
									children: { text: `TGL: ${format(shipment.eta, 'dd-MM-yyyy')}`, options: { size: 24 } },
								},
							]
						: []),
				],
				blNumberAndDate: [
					{
						width: { size: 5, type: WidthType.PERCENTAGE },
						children: { text: '', options: { size: 24 } },
					},
					{
						width: { size: 20, type: WidthType.PERCENTAGE },
						children: { text: shipment.shipmentType === 'sea' ? 'B/L' : 'HAWB / MAWB', options: { size: 24 } },
					},
					{
						options: { verticalAlign: VerticalAlign.TOP, text: { alignment: AlignmentType.CENTER } },
						width: { size: 5, type: WidthType.PERCENTAGE },
						children: { text: ':', options: { size: 24 } },
					},
					{
						...(shipment.shipmentType === 'air' && { options: { columnSpan: 2 } }),
						width: { size: shipment.shipmentType === 'sea' ? 50 : 70, type: WidthType.PERCENTAGE },
						children: { text: shipment.tracking.toUpperCase(), options: { size: 24 } },
					},
					...(shipment.shipmentType === 'sea'
						? [
								{
									width: { size: 20, type: WidthType.PERCENTAGE },
									children: { text: `TGL: ${format(shipment.trackingDate, 'dd-MM-yyyy')}`, options: { size: 24 } },
								},
							]
						: []),
				],
			},
		}

		const signatureTable = {
			rows: {
				receiver: [
					{
						width: { size: 50, type: WidthType.PERCENTAGE },
						children: { text: '', options: { size: 24 } },
					},
					{
						options: { text: { alignment: AlignmentType.RIGHT } },
						width: { size: 50, type: WidthType.PERCENTAGE },
						children: { text: `Jakarta, ${format(new Date(), 'dd-MMM-yyyy')}`, options: { size: 24 } },
					},
				],
				description: [
					{
						options: { text: { alignment: AlignmentType.LEFT } },
						width: { size: 50, type: WidthType.PERCENTAGE },
						children: { text: 'Yang Menerima Kuasa,', options: { size: 24 } },
					},
					{
						options: { text: { alignment: AlignmentType.RIGHT } },
						width: { size: 50, type: WidthType.PERCENTAGE },
						children: { text: 'Yang Memberi Kuasa,', options: { size: 24 } },
					},
				],
				signature: [
					{
						options: { text: { alignment: AlignmentType.LEFT } },
						width: { size: 50, type: WidthType.PERCENTAGE },
						children: { text: '', options: { size: 24, break: 7 } },
					},
					{
						options: { text: { alignment: AlignmentType.RIGHT } },
						width: { size: 50, type: WidthType.PERCENTAGE },
						children: { text: '', options: { size: 24, break: 7 } },
					},
				],
				giver: [
					{
						options: { text: { alignment: AlignmentType.LEFT } },
						width: { size: 50, type: WidthType.PERCENTAGE },
						children: {
							text: shipment.shipmentType === 'sea' ? 'Eka Susilo' : 'Gino / Dendi Ariawan',
							options: { size: 24, bold: true },
						},
					},
					{
						options: { text: { alignment: AlignmentType.RIGHT } },
						width: { size: 50, type: WidthType.PERCENTAGE },
						children: { text: importer.pic, options: { size: 24, bold: true } },
					},
				],
			},
		}

		const doc = new Document({
			sections: [
				{
					properties: {
						page: {
							margin: {
								top: '1.27cm',
								bottom: '1.27cm',
								left: '1.27cm',
								right: '1.27cm',
							},
						},
					},
					children: [
						new Paragraph({
							alignment: AlignmentType.CENTER,
							spacing: {
								after: 160,
							},
							children: [
								new TextRun({
									text: 'KOP SURAT',
									break: 1,
									size: 24,
								}),
							],
						}),
						new Paragraph({
							alignment: AlignmentType.CENTER,
							spacing: {
								after: 80,
							},
							children: [
								new TextRun({
									text: 'SURAT KUASA PENGAMBILAN DO',
									break: 3,
									underline: {
										type: UnderlineType.SINGLE,
									},
									bold: true,
									size: shipment.shipmentType === 'sea' ? 32 : 24,
								}),
							],
						}),
						...(shipment.shipmentType === 'sea'
							? []
							: [
									new Paragraph({
										alignment: AlignmentType.CENTER,
										spacing: {
											after: 160,
										},
										children: [
											new TextRun({
												text: 'No.',
												bold: true,
												size: 24,
											}),
										],
									}),
								]),
						new Paragraph({
							spacing: {
								after: 40,
							},
							children: [
								new TextRun({
									text: '',
									break: 1,
									size: 24,
								}),
							],
						}),
						new Table({
							layout: TableLayoutType.AUTOFIT,
							width: {
								size: 100,
								type: WidthType.PERCENTAGE,
							},
							rows: [
								new TableRow({
									children: [
										new TableCell({
											columnSpan: 4,
											width: {
												size: 100,
												type: WidthType.PERCENTAGE,
											},
											children: [
												new Paragraph({
													children: [
														new TextRun({
															text: 'Yang bertanda tangan di bawah ini:',
															size: 24,
														}),
													],
												}),
											],
										}),
									],
								}),
								...generateTableRow(importerTable),
							],
						}),
						new Paragraph({
							spacing: {
								after: 40,
							},
							children: [
								new TextRun({
									text: '',
									break: 1,
									size: 24,
								}),
							],
						}),
						new Table({
							layout: TableLayoutType.AUTOFIT,
							width: {
								size: 100,
								type: WidthType.PERCENTAGE,
							},
							rows: [
								new TableRow({
									children: [
										new TableCell({
											columnSpan: 4,
											width: {
												size: 100,
												type: WidthType.PERCENTAGE,
											},
											children: [
												new Paragraph({
													children: [
														new TextRun({
															text: 'Dengan ini memberikan kuasa kepada:',
															size: 24,
														}),
													],
												}),
											],
										}),
									],
								}),
								...generateTableRow(ppjkTable),
							],
						}),
						new Paragraph({
							spacing: {
								after: 40,
							},
							children: [
								new TextRun({
									text: '',
									break: 1,
									size: 24,
								}),
							],
						}),
						new Table({
							layout: TableLayoutType.AUTOFIT,
							width: {
								size: 100,
								type: WidthType.PERCENTAGE,
							},
							rows: [
								new TableRow({
									children: [
										new TableCell({
											columnSpan: 5,
											width: {
												size: 100,
												type: WidthType.PERCENTAGE,
											},
											children: [
												new Paragraph({
													children: [
														new TextRun({
															text: `Untuk mengambil document D/O Original di ${importer.company} dengan data sebagai berikut:`,
															size: 24,
														}),
													],
												}),
											],
										}),
									],
								}),
								...generateTableRow(shipmentTable),
							],
						}),
						new Paragraph({
							spacing: {
								after: 200,
							},
							children: [
								new TextRun({
									text: 'Demikian Surat Kuasa ini kami buat dengan sebenarnya untuk dapat dipergunakan sebagaimana mestinya.',
									break: 1,
									size: 24,
								}),
							],
						}),
						new Table({
							layout: TableLayoutType.AUTOFIT,
							width: {
								size: 100,
								type: WidthType.PERCENTAGE,
							},
							rows: [...generateTableRow(signatureTable)],
						}),
					],
				},
			],
		})

		Packer.toBlob(doc).then((blob) => {
			saveAs(blob, 'SKDO.docx')
		})
	}

	return <DropdownMenuItem onClick={() => handleDownloadSKDODocument()}>SKDO &#40;docx&#41;</DropdownMenuItem>
}

export default ExportSKDOButton
