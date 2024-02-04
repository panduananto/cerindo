import React, { useState } from 'react'

import { Tab } from '@headlessui/react'
import { utils, writeFile } from 'xlsx-js-style'

import ImportirForm from '../../components/Dashboard/SKPabean/ImportirForm'
import ShipmentForm from '../../components/Dashboard/SKPabean/ShipmentForm'
import SKDO from '../../components/Dashboard/SKPabean/SKDO/SKDO'
import SKP from '../../components/Dashboard/SKPabean/SKP/SKP'
import classNames from '../../utils/classNames'

const TAB_SK_PABEAN = ['SKP', 'SKDO', 'DNP', 'SKDAI']
const PPJK_DATA = {
	company: 'PT. CERINDO PRIMA LOGISTIK',
	address: 'Jalan Seulawah Raya Kompl. Puri Sentra Niaga B-37 LT.1 RT.12 RW.07 Cipinang Melayu, Makasar, Jakarta Timur',
	npwp: '02.444.890.4-005.000',
	edi: 'PJK021060095',
	type: {
		air: {
			name: 'Gino / Dendi Irawan',
			title: 'Staff Ops',
		},
		sea: {
			name: 'Eka Susilo',
			title: 'Manager Operasional',
		},
	},
	telp: '021-8629000',
}

const formatDate = (date) => {
	return new Date(date)
		.toLocaleString('id', {
			year: 'numeric',
			month: 'numeric',
			day: 'numeric',
		})
		.split('/')
		.join('-')
}

function SKPabean() {
	const [importir, setImportir] = useState(null)
	const [shipment, setShipment] = useState(null)

	const handleSubmitImportir = (values, action) => {
		setImportir(values)
	}

	const handleSubmitShipment = (values, action) => {
		setShipment(values)
	}

	const getMergedRows = (merged) => {
		return {
			s: { r: merged.rowStart, c: merged.colStart },
			e: { r: merged.rowEnd, c: merged.colEnd },
		}
	}

	const generateImportirRows = () => {
		const addressRow =
			importir.address.length >= 80
				? [['', 'Alamat', ':', importir.address], ['']]
				: [['', 'Alamat', ':', importir.address]]

		const rows = [
			['Yang bertanda tangan di bawah ini'],
			['', 'Nama', ':', importir.pic],
			['', 'Jabatan', ':', importir.title],
			['', 'Perusahaan', ':', importir.company],
			['', 'NPWP', ':', importir.npwp],
			...addressRow,
			['', 'No. Tlp.', ':', importir.phone],
		]

		return {
			rows: rows,
		}
	}

	const generatePpjkRows = () => {
		const rows = [
			['Dengan ini memberikan kuasa kepada PPJK yang di sebutkan di bawah ini :'],
			['', 'Nama', ':', PPJK_DATA.type[shipment.type].name],
			['', 'Jabatan', ':', PPJK_DATA.type[shipment.type].title],
			['', 'Perusahaan', ':', PPJK_DATA.company],
			['', 'Alamat', ':', PPJK_DATA.address],
			[''],
			['', 'NPWP', ':', PPJK_DATA.npwp],
			[''],
		]

		return {
			rows: rows,
		}
	}

	const generateGoodsRow = () => {
		return shipment.goods.split('\n').map((good, index) => {
			if (index === 0) {
				return ['', 'Ket. Barang', ':', good]
			} else {
				return ['', '', '', good]
			}
		})
	}

	const generateShipmentRows = () => {
		const goodsRow = generateGoodsRow()
		const rows = [
			['Untuk melakukan Pengurusan pemberitahuan Pabean yaitu pembuatan konsep PIB,'],
			['Pengajuan dan Pengiriman Data PIB, Pemeriksaan Fisik dan Pengeluaran Barang'],
			['Impor tersebut di bawah ini :'],
			['', 'Consignee', ':', importir.company.toUpperCase()],
			['', 'No. Tgl.BL', ':', shipment.tracking, '', '', `TGL : ${formatDate(shipment.trackingDate)}`],
			['', 'No. Tgl.Inv', ':', shipment.invoice, '', '', `TGL : ${formatDate(shipment.invoiceDate)}`],
			['', 'Vesse/ETA', ':', shipment.vessel, '', '', `TGL : ${formatDate(shipment.eta)}`],
			['', 'Party / Cont', ':', shipment.container],
			...goodsRow,
			['', 'Harga Barang', ':', shipment.price],
			[''],
		]

		return {
			rows: rows,
		}
	}

	const generateSignatureRows = () => {
		const rows = [
			['Demikian Surat Kuasa ini kami buat untuk di pergunakan sebagaimana mestinya'],
			['dan kepada pihak yang bersangkutan dimohonkan bantuannya.'],
			[''],
			[
				'',
				'',
				'',
				'',
				'',
				'',
				'',
				'Jakarta,',
				`${new Date()
					.toLocaleString('id', {
						year: 'numeric',
						month: 'short',
						day: 'numeric',
					})
					.split(' ')
					.join('-')}`,
			],
			['Yang Menerima Kuasa,', '', '', '', '', '', '', 'Yang Memberi Kuasa,'],
			[''],
			[''],
			[''],
			[''],
			[''],
			[''],
			[PPJK_DATA.type[shipment.type].name, '', '', '', '', '', '', importir.pic],
		]

		return {
			rows: rows,
		}
	}

	const generateMergedRows = () => {
		let mergedRows = []

		if (importir.address.length >= 80) {
			mergedRows.push(
				getMergedRows({ rowStart: 13, colStart: 3, rowEnd: 14, colEnd: 8 }),
				getMergedRows({ rowStart: 22, colStart: 3, rowEnd: 23, colEnd: 7 }),
				getMergedRows({ rowStart: 30, colStart: 3, rowEnd: 30, colEnd: 5 }),
				getMergedRows({ rowStart: 31, colStart: 3, rowEnd: 31, colEnd: 5 }),
				getMergedRows({ rowStart: 32, colStart: 3, rowEnd: 32, colEnd: 5 }),
				getMergedRows({ rowStart: 41, colStart: 0, rowEnd: 41, colEnd: 3 }),
				getMergedRows({ rowStart: 48, colStart: 0, rowEnd: 48, colEnd: 1 }),
			)
		} else {
			mergedRows.push(
				getMergedRows({ rowStart: 13, colStart: 3, rowEnd: 13, colEnd: 8 }),
				getMergedRows({ rowStart: 21, colStart: 3, rowEnd: 22, colEnd: 7 }),
				getMergedRows({ rowStart: 29, colStart: 3, rowEnd: 29, colEnd: 5 }),
				getMergedRows({ rowStart: 30, colStart: 3, rowEnd: 30, colEnd: 5 }),
				getMergedRows({ rowStart: 31, colStart: 3, rowEnd: 31, colEnd: 5 }),
				getMergedRows({ rowStart: 40, colStart: 0, rowEnd: 40, colEnd: 3 }),
				getMergedRows({ rowStart: 47, colStart: 0, rowEnd: 47, colEnd: 1 }),
			)
		}

		return mergedRows
	}

	const handleDownloadSKP = () => {
		const importirRows = generateImportirRows()
		const ppjkRows = generatePpjkRows()
		const shipmentRows = generateShipmentRows()
		const signatureRows = generateSignatureRows()
		const mergedRows = generateMergedRows()

		const workbook = utils.book_new()
		const worksheet = utils.aoa_to_sheet([
			[''],
			[''],
			['', 'KOP SURAT', '', '', '', '', '', '', ''],
			[''],
			[''],
			['SURAT KUASA', '', '', '', '', '', '', '', ''],
			['', '', '', 'Nomor:', '', 'Tanggal:', '', '', ''],
			[''],
			...importirRows.rows,
			[''],
			[''],
			...ppjkRows.rows,
			...shipmentRows.rows,
			...signatureRows.rows,
		])

		worksheet['!merges'] = [
			{ s: { r: 2, c: 1 }, e: { r: 2, c: 8 } },
			{ s: { r: 5, c: 0 }, e: { r: 5, c: 8 } },
			{ s: { r: 6, c: 3 }, e: { r: 6, c: 4 } },
			{ s: { r: 6, c: 5 }, e: { r: 6, c: 7 } },
			{ s: { r: 8, c: 0 }, e: { r: 8, c: 3 } },
			...mergedRows,
		]

		worksheet['!cols'] = [
			{ width: 3.7 },
			{ width: 13.7 },
			{ width: 1.9 },
			{ width: 19.7 },
			{ width: 8.5 },
			{ width: 9.2 },
			{ width: 9.2 },
			{ width: 9.2 },
			{ width: 15.6 },
		]

		const range = utils.decode_range(worksheet['!ref'] ?? '')
		const rowCount = range.e.r
		const columnCount = range.e.c

		for (let row = 0; row <= rowCount; row++) {
			for (let col = 0; col <= columnCount; col++) {
				const cellRef = String(utils.encode_cell({ r: row, c: col }))

				if (worksheet[cellRef] !== undefined) {
					worksheet[cellRef].s = { font: { name: 'Times New Roman', sz: 12 } }

					if (col === 2) {
						worksheet[cellRef].s = {
							font: { name: 'Times New Roman', sz: 12 },
							alignment: { vertical: 'center', horizontal: 'center' },
						}
					}

					if (importir.address.length >= 80) {
						if (cellRef === 'D14' || cellRef === 'D23') {
							worksheet[cellRef].s = {
								font: { name: 'Times New Roman', sz: 12 },
								alignment: { wrapText: true },
							}
						} else if (cellRef === 'H41') {
							worksheet[cellRef].s = {
								font: { name: 'Times New Roman', sz: 12 },
								alignment: { horizontal: 'right' },
							}
						} else if (cellRef === 'A49' || cellRef === 'H49') {
							worksheet[cellRef].s = {
								font: { name: 'Times New Roman', sz: 12, bold: true },
							}
						}
					} else {
						if (cellRef === 'D13' || cellRef === 'D22') {
							worksheet[cellRef].s = {
								font: { name: 'Times New Roman', sz: 12 },
								alignment: { wrapText: true },
							}
						} else if (cellRef === 'H40') {
							worksheet[cellRef].s = {
								font: { name: 'Times New Roman', sz: 12 },
								alignment: { horizontal: 'right' },
							}
						} else if (cellRef === 'A48' || cellRef === 'H48') {
							worksheet[cellRef].s = {
								font: { name: 'Times New Roman', sz: 12, bold: true },
							}
						}
					}

					if (cellRef === 'B3') {
						worksheet[cellRef].s = { alignment: { vertical: 'center', horizontal: 'center' } }
					} else if (cellRef === 'A6') {
						worksheet[cellRef].s = {
							font: { name: 'Times New Roman', sz: 16, bold: true, underline: true },
							alignment: { vertical: 'center', horizontal: 'center' },
						}
					} else if (cellRef === 'D7' || cellRef === 'F7') {
						worksheet[cellRef].s = { font: { name: 'Times New Roman', sz: 10 } }
					}
				}
			}
		}

		utils.book_append_sheet(workbook, worksheet, 'SKP')

		writeFile(workbook, 'SKP.xlsx')
	}

	return (
		<div className="h-[calc(100vh-65px)] w-full overflow-y-auto bg-slate-100">
			<div className="px-8 py-8 sm:px-10 lg:px-12">
				<h1 className="text-xl font-semibold leading-8 sm:text-2xl 2md:text-3xl">Pembuatan Dokumen SK Pabean</h1>
				<p className="mt-1 font-medium text-slate-700">Buat dokumen SK Pabean yang Anda butuhkan dengan mudah</p>
				<div className="mt-4">
					<div className="grid grid-cols-3 gap-x-6">
						<div className="col-span-3 2md:col-span-1">
							<h2 className="font-semibold leading-8">Perusahaan Importir</h2>
							<p className="text-sm text-slate-600">
								Pengisian data perusahaan importir, harap pastikan data yang diisi adalah benar.
							</p>
						</div>
						<div className="col-span-3 mt-5 rounded bg-white shadow-sm 2md:col-span-2 2md:mt-0">
							<ImportirForm handleSubmitImportir={handleSubmitImportir} />
						</div>
					</div>
					<div className="hidden sm:block">
						<div className="py-5">
							<div className="border-t border-slate-200"></div>
						</div>
					</div>
					<div className="mt-8 grid grid-cols-3 gap-x-6 sm:mt-0">
						<div className="col-span-3 2md:col-span-1">
							<h2 className="font-semibold leading-8">Shipment</h2>
							<p className="text-sm text-slate-600">
								Pengisian data shipment, harap pastikan data yang diisi adalah benar.
							</p>
						</div>
						<div className="col-span-3 mt-5 rounded bg-white shadow-sm 2md:col-span-2 2md:mt-0">
							<ShipmentForm handleSubmitShipment={handleSubmitShipment} />
						</div>
					</div>
				</div>
			</div>
			<div className="mt-4 px-8">
				<Tab.Group>
					<Tab.List className="flex items-stretch justify-between space-x-2 border-b-2 border-red-600">
						{TAB_SK_PABEAN.map((tab) => (
							<Tab
								key={tab}
								className={({ selected }) =>
									classNames(
										'w-full rounded-t border border-b-0 border-slate-300 bg-white py-4 text-sm font-medium',
										'focus:outline-none focus:ring-4 focus:ring-red-300',
										selected
											? 'border-red-600 bg-red-200 text-red-600'
											: 'text-slate-500 hover:border-red-600 hover:bg-red-600 hover:text-white',
									)
								}
							>
								{tab}
							</Tab>
						))}
					</Tab.List>
					<Tab.Panels className="mx-auto w-min py-8">
						<Tab.Panel className="w-[46rem] bg-white px-8 py-4">
							<button onClick={handleDownloadSKP}>download SKP</button>
							<SKP importir={importir} shipment={shipment} ppjk={PPJK_DATA} />
						</Tab.Panel>
						<Tab.Panel className="w-[46rem] bg-white px-8 py-4">
							<SKDO importir={importir} shipment={shipment} ppjk={PPJK_DATA} />
						</Tab.Panel>
						<Tab.Panel className="bg-white p-4">DNP</Tab.Panel>
						<Tab.Panel className="bg-white p-4">SKDAI</Tab.Panel>
					</Tab.Panels>
				</Tab.Group>
			</div>
		</div>
	)
}

export default SKPabean
