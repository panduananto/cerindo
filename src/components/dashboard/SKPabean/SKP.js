import React from 'react';

function SKP({ importir, shipment, ppjk }) {
	let now = new Date()
		.toLocaleString('id', {
			year: 'numeric',
			month: 'short',
			day: 'numeric',
		})
		.split(' ')
		.join('-');

	return (
		<div className="font-serif">
			<h3 className="text-center text-base font-bold text-black underline">
				<strong>SURAT KUASA</strong>
			</h3>
			<div className="grid grid-cols-12 text-sm">
				<p className="col-end-4">Nomor:</p>
				<p className="col-start-7">Tanggal:</p>
			</div>
			<div className="mt-4 text-sm">
				<div>
					<p>Yang bertanda tangan di bawah ini:</p>
					<ol className="pl-4">
						<li>
							<div className="grid grid-cols-12">
								<p>Nama</p>
								<p className="col-span-4 col-start-3">
									: {importir !== null ? importir.pic : '__'}
								</p>
							</div>
						</li>
						<li>
							<div className="grid grid-cols-12">
								<p>Jabatan</p>
								<p className="col-span-4 col-start-3">
									: {importir !== null ? importir.title : '__'}
								</p>
							</div>
						</li>
						<li>
							<div className="grid grid-cols-12">
								<p>Perusahaan</p>
								<p className="col-span-6 col-start-3">
									: {importir !== null ? importir.company : '__'}
								</p>
							</div>
						</li>
						<li>
							<div className="grid grid-cols-12">
								<p>NPWP</p>
								<p className="col-span-4 col-start-3">
									: {importir !== null ? importir.npwp : '__'}
								</p>
							</div>
						</li>
						<li>
							<div className="grid grid-cols-12">
								<p>Alamat</p>
								<p className="col-span-12 col-start-3">
									: {importir !== null ? importir.address : '__'}
								</p>
							</div>
						</li>
						<li>
							<div className="grid grid-cols-12">
								<p className="col-span-2">No. Tlp.</p>
								<p className="col-span-3 col-start-3">
									: {importir !== null ? importir.phone : '__'}
								</p>
							</div>
						</li>
					</ol>
				</div>
				<div className="mt-8">
					<p>Dengan ini memberikan kuasa kepada PPJK yang di sebutkan di bawah ini:</p>
					<ol className="pl-4">
						<li>
							<div className="grid grid-cols-12">
								<p className="col-span-2">Nama</p>
								<p className="col-start-3">:</p>
							</div>
						</li>
						<li>
							<div className="grid grid-cols-12">
								<p>Jabatan</p>
								<p className="col-start-3">:</p>
							</div>
						</li>
						<li>
							<div className="grid grid-cols-12">
								<p>Perusahaan</p>
								<p className="col-start-3">:</p>
							</div>
						</li>
						<li>
							<div className="grid grid-cols-12">
								<p>Alamat</p>
								<p className="col-start-3">:</p>
							</div>
						</li>
						<li>
							<div className="grid grid-cols-12">
								<p>NPWP</p>
								<p className="col-start-3">:</p>
							</div>
						</li>
					</ol>
				</div>
				<div className="mt-8">
					<p>Untuk melakukan Pengurusan pemberitahuan Pabean yaitu pembuatan konsep PIB,</p>
					<p>Pengajuan dan Pengiriman Data PIB, Pemeriksaan Fisik dan Pengeluaran Barang</p>
					<p>Impor tersebut di bawah ini:</p>
					<ol className="pl-4 pt-4">
						<li>
							<div className="grid grid-cols-12">
								<p className="col-span-2">Consignee</p>
								<p className="col-start-3">:</p>
							</div>
						</li>
						<li>
							<div className="grid grid-cols-12">
								<p className="col-span-2">No. Tgl. BL</p>
								<p className="col-start-3">:</p>
							</div>
						</li>
						<li>
							<div className="grid grid-cols-12">
								<p className="col-span-2">No. Tgl. Inv</p>
								<p className="col-start-3">:</p>
							</div>
						</li>
						<li>
							<div className="grid grid-cols-12">
								<p className="col-span-2">Vessel / ETA</p>
								<p className="col-start-3">:</p>
							</div>
						</li>
						<li>
							<div className="grid grid-cols-12">
								<p className="col-span-2">Party / Cont</p>
								<p className="col-start-3">:</p>
							</div>
						</li>
						<li>
							<div className="grid grid-cols-12">
								<p className="col-span-2">Ket. Barang</p>
								<p className="col-start-3">:</p>
							</div>
						</li>
						<li>
							<div className="grid grid-cols-12">
								<p className="col-span-2">Harga Barang</p>
								<p className="col-start-3">:</p>
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
							</div>
							<div>
								<p>Yang Memberi Kuasa,</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default SKP;
