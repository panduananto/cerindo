import React from 'react'

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

function SKDOAir({ shipment, importir, ppjk }) {
	let now = new Date()
		.toLocaleString('id', {
			year: 'numeric',
			month: 'short',
			day: 'numeric',
		})
		.split(' ')
		.join('-')

	return (
		<div className="font-serif">
			<h3 className="mt-32 text-center text-base font-bold text-black">
				<strong className="underline">SURAT KUASA PENGAMBILAN DO</strong>
				<p className="text-center font-bold">No:</p>
			</h3>
			<div className="mt-4 text-sm">
				<div>
					<p>Yang bertanda tangan di bawah ini:</p>
					<ol className="pl-4">
						<li>
							<div className="grid grid-cols-12">
								<p>Nama</p>
								<p className="col-span-4 col-start-3">: {importir !== null ? importir.pic : '__'}</p>
							</div>
						</li>
						<li>
							<div className="grid grid-cols-12">
								<p>Jabatan</p>
								<p className="col-span-4 col-start-3">: {importir !== null ? importir.title : '__'}</p>
							</div>
						</li>
						<li>
							<div className="grid grid-cols-12">
								<p>Perusahaan</p>
								<p className="col-span-6 col-start-3">: {importir !== null ? importir.company : '__'}</p>
							</div>
						</li>
						<li>
							<div className="grid grid-cols-12">
								<p>NPWP</p>
								<p className="col-span-4 col-start-3">: {importir !== null ? importir.npwp : '__'}</p>
							</div>
						</li>
						<li>
							<div className="grid grid-cols-12">
								<p>Alamat</p>
								<p className="col-span-12 col-start-3">: {importir !== null ? importir.address : '__'}</p>
							</div>
						</li>
					</ol>
				</div>
				<div className="mt-8">
					<p>Dengan ini memberikan kuasa kepada :</p>
					<ol className="pl-4">
						<li>
							<div className="grid grid-cols-12">
								<p className="col-span-2">Nama PPJK</p>
								<p className="col-span-6 col-start-3">: {ppjk.company}</p>
							</div>
						</li>
						<li>
							<div className="grid grid-cols-12">
								<p>NPWP</p>
								<p className="col-span-6 col-start-3">: {ppjk.npwp}</p>
							</div>
						</li>
						<li>
							<div className="grid grid-cols-12">
								<p>Alamat</p>
								<p className="col-span-7 col-start-3">: {ppjk.address}</p>
							</div>
						</li>
						<li>
							<div className="grid grid-cols-12">
								<p className="col-span-2">Nama</p>
								<p className="col-span-6 col-start-3">: {shipment !== null ? ppjk.type[shipment.type].name : '__'}</p>
							</div>
						</li>
						<li>
							<div className="grid grid-cols-12">
								<p>Jabatan</p>
								<p className="col-span-6 col-start-3">: {shipment !== null ? ppjk.type[shipment.type].title : '__'}</p>
							</div>
						</li>
					</ol>
				</div>
				<div className="mt-8">
					<p>Untuk mengambil Dokumen D/O Original di PT.</p>
					<p>dengan data sebagai berikut:</p>
					<ol className="pl-4 pt-4">
						<li>
							<div className="grid grid-cols-12">
								<p className="col-span-2">Pemasok</p>
								<p className="col-span-6 col-start-3 uppercase">: {importir !== null ? importir.company : '__'}</p>
							</div>
						</li>
						<li>
							<div className="grid grid-cols-12">
								<p className="col-span-2">Nama Barang</p>
								<p className="col-span-6 col-start-3 uppercase">: {shipment !== null ? shipment.goods : '__'}</p>
							</div>
						</li>
						<li>
							<div className="grid grid-cols-12">
								<p className="col-span-2">Party / GW</p>
								<p className="col-span-7 col-start-3">: {shipment !== null ? shipment.container : '__'}</p>
							</div>
						</li>
						<li>
							<div className="grid grid-cols-12">
								<p className="col-span-2">Flight</p>
								<p className="col-span-7 col-start-3">: {shipment !== null ? shipment.flight : '__'}</p>
							</div>
						</li>
						<li>
							<div className="grid grid-cols-12">
								<p className="col-span-2">HAWB / MAWB</p>
								<p className="col-span-7 col-start-3">: {shipment !== null ? shipment.tracking : '__'}</p>
							</div>
						</li>
					</ol>
				</div>
				<div className="mt-12">
					<p>Demikian Surat Kuasa ini kami buat dengan sebenarnya untuk dapat dipergunakan</p>
					<p>sebagaimana mestinya.</p>
					<div className="mt-8">
						<p className="text-right">Jakarta, {now}</p>
						<div className="flex justify-between">
							<div>
								<p>Yang Menerima Kuasa,</p>
								<p className="mt-32 font-bold">{shipment !== null ? ppjk.type[shipment.type].name : '__'}</p>
							</div>
							<div>
								<p>Yang Memberi Kuasa,</p>
								<p className="mt-32 font-bold">{importir !== null ? importir.pic : '__'}</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default SKDOAir
