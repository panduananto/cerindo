import * as z from 'zod'

export const importersSchema = z.object({
	pic: z.string({ required_error: 'Nama PIC harus diisi' }).min(1, 'Nama PIC harus diisi'),
	picTitle: z.string({ required_error: 'Jabatan PIC harus diisi' }).min(1, 'Jabatan PIC harus diisi'),
	company: z.string({ required_error: 'Nama perusahaan harus diisi' }).min(1, 'Nama perusahaan harus diisi'),
	npwp: z
		.string({ required_error: 'NPWP perusahaan importir harus diisi' })
		.min(1, 'NPWP perusahaan importir harus diisi')
		.min(15, { message: 'NPWP minimal harus 15 digit' }),
	phone: z
		.string({ required_error: 'Nomor telepon perusahaan importir harus diisi' })
		.min(1, 'Nomor telepon perusahaan importir harus diisi'),
	address: z
		.string({ required_error: 'Alamat perusahaan importir harus diisi' })
		.min(1, 'ALamat perusahaan importir harus diisi'),
})

export const shipmentSchema = z
	.object({
		shipmentType: z.enum(['sea', 'air']).refine((value) => ['sea', 'air'].includes(value), {
			message: 'Tipe shipment harus diisi di antara udara atau laut',
		}),
		aircraft: z.string().optional().or(z.literal('')),
		goods: z
			.string({ required_error: 'Deskripsi barang harus diisi' })
			.min(1, 'Deskripsi barang harus diisi')
			.max(50, 'Deskripsi barang maksimal 50 karakter'),
		containerSerial: z.string().optional().or(z.literal('')),
		vessel: z.string({ required_error: 'Nama vessel harus diisi' }).min(1, 'Nama vessel harus diisi'),
		eta: z.date({ required_error: 'ETA harus diisi' }),
		tracking: z.string({ required_error: 'Nomor B/L atau AWB harus diisi' }).min(1, 'Nomor B/L harus diisi'),
		trackingDate: z.date({ required_error: 'Tanggal B/L atau AWB harus diisi' }),
		invoice: z.string({ required_error: 'Nomor invoice harus diisi' }).min(1, 'Nomor invoice harus diisi'),
		invoiceDate: z.date({ required_error: 'Tanggal invoice harus diisi' }),
		price: z.string({ required_error: 'Total harga barang harus diisi' }).min(1, 'Total harga barang harus diisi'),
	})
	.refine(
		(value) => {
			if (value.shipmentType === 'air') {
				return value !== undefined && value !== null
			} else {
				return true
			}
		},
		{
			message: 'Kode penerbangan harus diisi',
			path: ['flight'],
		},
	)
