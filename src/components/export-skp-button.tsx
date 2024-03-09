'use client'

import React from 'react'

import { format } from 'date-fns'
import {
	AlignmentType,
	Document,
	LevelFormat,
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

const ExportSKPButton = () => {
	const importer = useAppSelector(selectImporter)
	const shipment = useAppSelector(selectShipment)

	function handleDownloadSKPDocument() {
		if (!importer || !shipment) {
			toast.error('Oops!', {
				description: 'Data importir atau shipment belum lengkap',
			})

			return
		}

		const numberAndDateTable = [
			{
				width: { size: 20, type: WidthType.PERCENTAGE },
				children: { text: '', size: 24 },
			},
			{
				width: { size: 10, type: WidthType.PERCENTAGE },
				children: { text: 'Nomor:', size: 24 },
			},
			{
				width: { size: 30, type: WidthType.PERCENTAGE },
				children: { text: '', size: 24 },
			},
			{
				width: { size: 10, type: WidthType.PERCENTAGE },
				children: { text: 'Tanggal:', size: 24 },
			},
			{
				width: { size: 30, type: WidthType.PERCENTAGE },
				children: { text: '', size: 24 },
			},
		]

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
				...(shipment.shipmentType === 'sea' && {
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
							children: { text: 'Eka Susilo', options: { size: 24 } },
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
							children: { text: 'Manager Operasional', options: { size: 24 } },
						},
					],
				}),
				company: [
					{
						width: { size: 5, type: WidthType.PERCENTAGE },
						children: { text: '', options: { size: 24 } },
					},
					{
						width: { size: 20, type: WidthType.PERCENTAGE },
						children: { text: shipment.shipmentType === 'sea' ? 'Perusahaan' : 'Nama PPJK', options: { size: 24 } },
					},
					{
						options: { verticalAlign: VerticalAlign.TOP, text: { alignment: AlignmentType.CENTER } },
						width: { size: 5, type: WidthType.PERCENTAGE },
						children: { text: ':', options: { size: 24 } },
					},
					{
						width: { size: 70, type: WidthType.PERCENTAGE },
						children: { text: 'PT. CERINDO PRIMA LOGISTIK', options: { size: 24 } },
					},
				],
				[shipment.shipmentType === 'sea' ? 'address' : 'npwp']: [
					{
						width: { size: 5, type: WidthType.PERCENTAGE },
						children: { text: '', options: { size: 24 } },
					},
					{
						width: { size: 20, type: WidthType.PERCENTAGE },
						children: { text: shipment.shipmentType === 'sea' ? 'Alamat' : 'NPWP', options: { size: 24 } },
					},
					{
						options: { verticalAlign: VerticalAlign.TOP, text: { alignment: AlignmentType.CENTER } },
						width: { size: 5, type: WidthType.PERCENTAGE },
						children: { text: ':', options: { size: 24 } },
					},
					{
						width: { size: 70, type: WidthType.PERCENTAGE },
						children: {
							text:
								shipment.shipmentType === 'sea'
									? 'Jalan Seulawah Raya Kompl. Puri Sentra Niaga B-37 LT.1 RT.12 RW.07 Cipinang Melayu, Makasar, Jakarta Timur'
									: '02.444.890.4-005.000',
							options: { size: 24 },
						},
					},
				],
				[shipment.shipmentType === 'sea' ? 'npwp' : 'address']: [
					{
						width: { size: 5, type: WidthType.PERCENTAGE },
						children: { text: '', options: { size: 24 } },
					},
					{
						width: { size: 20, type: WidthType.PERCENTAGE },
						children: { text: shipment.shipmentType === 'sea' ? 'NPWP' : 'Alamat', options: { size: 24 } },
					},
					{
						options: { verticalAlign: VerticalAlign.TOP, text: { alignment: AlignmentType.CENTER } },
						width: { size: 5, type: WidthType.PERCENTAGE },
						children: { text: ':', options: { size: 24 } },
					},
					{
						width: { size: 70, type: WidthType.PERCENTAGE },
						children: {
							text:
								shipment.shipmentType === 'sea'
									? '02.444.890.4-005.000'
									: 'Jalan Seulawah Raya Kompl. Puri Sentra Niaga B-37 LT.1 RT.12 RW.07 Cipinang Melayu, Makasar, Jakarta Timur',
							options: { size: 24 },
						},
					},
				],
				...(shipment.shipmentType === 'air' && {
					ediNumber: [
						{
							width: { size: 5, type: WidthType.PERCENTAGE },
							children: { text: '', options: { size: 24 } },
						},
						{
							width: { size: 20, type: WidthType.PERCENTAGE },
							children: { text: 'No. EDI', options: { size: 24 } },
						},
						{
							options: { verticalAlign: VerticalAlign.TOP, text: { alignment: AlignmentType.CENTER } },
							width: { size: 5, type: WidthType.PERCENTAGE },
							children: { text: ':', options: { size: 24 } },
						},
						{
							width: { size: 70, type: WidthType.PERCENTAGE },
							children: { text: 'PJK021060095', options: { size: 24 } },
						},
					],
					phone: [
						{
							width: { size: 5, type: WidthType.PERCENTAGE },
							children: { text: '', options: { size: 24 } },
						},
						{
							width: { size: 20, type: WidthType.PERCENTAGE },
							children: { text: 'Telp/Fax', options: { size: 24 } },
						},
						{
							options: { verticalAlign: VerticalAlign.TOP, text: { alignment: AlignmentType.CENTER } },
							width: { size: 5, type: WidthType.PERCENTAGE },
							children: { text: ':', options: { size: 24 } },
						},
						{
							width: { size: 70, type: WidthType.PERCENTAGE },
							children: { text: '021-8629000', options: { size: 24 } },
						},
					],
				}),
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
						children: { text: shipment.shipmentType === 'sea' ? 'Consignee' : 'Pemasok', options: { size: 24 } },
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
				[shipment.shipmentType === 'sea' ? 'blNumberAndDate' : 'goodsDescription']: [
					{
						width: { size: 5, type: WidthType.PERCENTAGE },
						children: { text: '', options: { size: 24 } },
					},
					{
						width: { size: 20, type: WidthType.PERCENTAGE },
						children: { text: shipment.shipmentType === 'sea' ? 'No. Tgl. BL' : 'Nama Barang', options: { size: 24 } },
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
				...(shipment.shipmentType === 'sea' && {
					invoiceNumberAndDate: [
						{
							width: { size: 5, type: WidthType.PERCENTAGE },
							children: { text: '', options: { size: 24 } },
						},
						{
							width: { size: 20, type: WidthType.PERCENTAGE },
							children: {
								text: shipment.shipmentType === 'sea' ? 'No. Tgl. Inv' : 'No / Tgl Invoice',
								options: { size: 24 },
							},
						},
						{
							options: { verticalAlign: VerticalAlign.TOP, text: { alignment: AlignmentType.CENTER } },
							width: { size: 5, type: WidthType.PERCENTAGE },
							children: { text: ':', options: { size: 24 } },
						},
						{
							width: { size: 50, type: WidthType.PERCENTAGE },
							children: { text: shipment.invoice.toUpperCase(), options: { size: 24 } },
						},
						{
							width: { size: 20, type: WidthType.PERCENTAGE },
							children: { text: `TGL: ${format(shipment.invoiceDate, 'dd-MM-yyyy')}`, options: { size: 24 } },
						},
					],
				}),
				[shipment.shipmentType === 'sea' ? 'vesselAndETA' : 'containerNumber']: [
					{
						width: { size: 5, type: WidthType.PERCENTAGE },
						children: { text: '', options: { size: 24 } },
					},
					{
						width: { size: 20, type: WidthType.PERCENTAGE },
						children: { text: shipment.shipmentType === 'sea' ? 'Vessel/ETA' : 'Party / GW', options: { size: 24 } },
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
							text:
								shipment.shipmentType === 'sea'
									? shipment.vessel.toUpperCase()
									: shipment.containerSerial?.toUpperCase(),
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
				[shipment.shipmentType === 'sea' ? 'containerNumber' : 'vesselAndETA']: [
					{
						width: { size: 5, type: WidthType.PERCENTAGE },
						children: { text: '', options: { size: 24 } },
					},
					{
						width: { size: 20, type: WidthType.PERCENTAGE },
						children: { text: shipment.shipmentType === 'sea' ? 'Party/Cont' : 'Flight', options: { size: 24 } },
					},
					{
						options: { verticalAlign: VerticalAlign.TOP, text: { alignment: AlignmentType.CENTER } },
						width: { size: 5, type: WidthType.PERCENTAGE },
						children: { text: ':', options: { size: 24 } },
					},
					{
						options: { columnSpan: 2 },
						width: { size: 70, type: WidthType.PERCENTAGE },
						children: {
							text:
								shipment.shipmentType === 'sea'
									? shipment.containerSerial?.toUpperCase()
									: shipment.vessel.toUpperCase(),
							options: { size: 24 },
						},
					},
				],
				[shipment.shipmentType === 'sea' ? 'goodsDescription' : 'blNumberAndDate']: [
					{
						width: { size: 5, type: WidthType.PERCENTAGE },
						children: { text: '', options: { size: 24 } },
					},
					{
						width: { size: 20, type: WidthType.PERCENTAGE },
						children: { text: shipment.shipmentType === 'sea' ? 'Ket. Barang' : 'AWB / Tgl', options: { size: 24 } },
					},
					{
						options: { verticalAlign: VerticalAlign.TOP, text: { alignment: AlignmentType.CENTER } },
						width: { size: 5, type: WidthType.PERCENTAGE },
						children: { text: ':', options: { size: 24 } },
					},
					{
						options: { columnSpan: 2 },
						width: { size: 70, type: WidthType.PERCENTAGE },
						children: {
							text:
								shipment.shipmentType === 'sea'
									? shipment.goods.toUpperCase()
									: `${shipment.tracking} / ${format(shipment.trackingDate, 'dd-MM-yyyy')}`,
							options: { size: 24 },
						},
					},
				],
				...(shipment.shipmentType === 'sea' && {
					price: [
						{
							width: { size: 5, type: WidthType.PERCENTAGE },
							children: { text: '', options: { size: 24 } },
						},
						{
							width: { size: 20, type: WidthType.PERCENTAGE },
							children: { text: 'Harga Barang', options: { size: 24 } },
						},
						{
							options: { verticalAlign: VerticalAlign.TOP, text: { alignment: AlignmentType.CENTER } },
							width: { size: 5, type: WidthType.PERCENTAGE },
							children: { text: ':', options: { size: 24 } },
						},
						{
							options: { columnSpan: 2 },
							width: { size: 70, type: WidthType.PERCENTAGE },
							children: { text: shipment.price.toUpperCase(), options: { size: 24 } },
						},
					],
				}),
				...(shipment.shipmentType === 'air' && {
					otherDocs: [
						{
							width: { size: 5, type: WidthType.PERCENTAGE },
							children: { text: '', options: { size: 24 } },
						},
						{
							width: { size: 20, type: WidthType.PERCENTAGE },
							children: { text: 'Dok Pelengkap Lainnya', options: { size: 24 } },
						},
						{
							options: { verticalAlign: VerticalAlign.TOP, text: { alignment: AlignmentType.CENTER } },
							width: { size: 5, type: WidthType.PERCENTAGE },
							children: { text: ':', options: { size: 24 } },
						},
						{
							options: { columnSpan: 2 },
							width: { size: 70, type: WidthType.PERCENTAGE },
							children: { text: 'Terlampir', options: { size: 24 } },
						},
					],
				}),
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
						children: { text: 'Eka Susilo', options: { size: 24, bold: true } },
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
			numbering: {
				config: [
					{
						reference: 'numbering-config-1',
						levels: [
							{
								level: 0,
								format: LevelFormat.DECIMAL,
								text: '%1.',
								alignment: AlignmentType.START,
								style: {
									paragraph: {
										indent: { left: '0.63cm', hanging: `${0.63}cm` },
									},
								},
							},
						],
					},
				],
			},
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
								after: 160,
							},
							children: [
								new TextRun({
									text: 'SURAT KUASA',
									break: 3,
									underline: {
										type: UnderlineType.SINGLE,
									},
									bold: true,
									size: 24,
								}),
							],
						}),
						...(shipment.shipmentType === 'air'
							? [
									new Paragraph({
										alignment: AlignmentType.CENTER,
										spacing: {
											after: 80,
										},
										children: [
											new TextRun({
												text: 'PELAKSANAAN PENGURUSAN DOKUMEN DAN BARANG IMPOR/EKSPOR',
												underline: {
													type: UnderlineType.SINGLE,
												},
												bold: true,
												size: 24,
											}),
										],
									}),
									new Paragraph({
										alignment: AlignmentType.CENTER,
										children: [
											new TextRun({
												text: 'No.',
												size: 24,
											}),
										],
									}),
								]
							: [
									new Table({
										layout: TableLayoutType.AUTOFIT,
										width: {
											size: 100,
											type: WidthType.PERCENTAGE,
										},
										rows: [
											new TableRow({
												children: [
													...numberAndDateTable.map((row) => {
														return new TableCell({
															width: {
																size: row.width.size,
																type: row.width.type,
															},
															children: [
																new Paragraph({
																	children: [
																		new TextRun({
																			text: row.children.text,
																			size: row.children.size,
																		}),
																	],
																}),
															],
														})
													}),
												],
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
															text:
																shipment.shipmentType === 'sea'
																	? 'Yang bertanda tangan di bawah ini:'
																	: 'Kami yang bertanda tangan di bawah ini :',
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
															text:
																shipment.shipmentType === 'sea'
																	? 'Dengan ini memberikan kuasa kepada PPJK yang disebutkan di bawah ini:'
																	: 'Dengan ini memberikan kuasa kepada:',
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
															text:
																shipment.shipmentType === 'sea'
																	? 'Untuk melakukan Pengurusan pemberitahuan Pabean yaitu pembuatan konsep PIB, Pengajuan dan Pengiriman Data PIB, Pemeriksaan Fisik dan Pengeluaran Barang Impor tersebut di bawah ini:'
																	: 'Selanjutnya dalam Surat Kuasa ini disebut sebagai PENERIMA KUASA, guna bertindak atas nama PEMBERI KUASA untuk mentransfer data PIB pada Kantor Pelayanan Bea dan Cukai yang bersangkutan atas import/eksport barang tersebut di bawah ini:',
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
						...(shipment.shipmentType === 'air'
							? [
									new Paragraph({
										children: [
											new TextRun({
												text: 'Pemberi kuasa dengan ini menyatakan:',
												break: 1,
												size: 24,
											}),
										],
									}),
									new Paragraph({
										numbering: {
											reference: 'numbering-config-1',
											level: 0,
										},
										children: [
											new TextRun({
												text: 'BERTANGGUNG JAWAB SEPENUHNYA ATAS SEGALA KEWAJIBAN KEPABEANAN SEBAGAIMANA DIMAKSUD DALAM UNDANG-UNDANG NO.10 TAHUN 1995 TENTANG KEPABEANAN.',
												size: 24,
											}),
										],
									}),
									new Paragraph({
										numbering: {
											reference: 'numbering-config-1',
											level: 0,
										},
										children: [
											new TextRun({
												text: 'KEBENARAN DAN KEABSAHAN DOKUMEN MELIPUTI: HARGA DAN FISIK BARANG YANG DIIMPOR ADALAH SEPENUHNYA MENJADI TANGGUNG JAWAB KAMI SEBAGAI IMPORTIR DAN MEMBEBASKAN “PT. CERINDO PRIMA LOGISTIK” DARI SEGALA AKIBAT HUKUM YANG TIMBUL DI KEMUDIAN HARI.',
												size: 24,
											}),
										],
									}),
								]
							: []),
						new Paragraph({
							spacing: {
								after: 200,
							},
							children: [
								new TextRun({
									text: 'Demikian Surat Kuasa ini kami buat untuk dipergunakan sebagaimana mestinya dan kepada pihak yang bersangkutan dimohonkan bantuannya.',
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
			saveAs(blob, 'SKP.docx')
		})
	}

	return <DropdownMenuItem onClick={() => handleDownloadSKPDocument()}>SKP &#40;docx&#41;</DropdownMenuItem>
}

export default ExportSKPButton
