import React from 'react';

const formatDate = (date) => {
	return new Date(date)
		.toLocaleString('id', {
			year: 'numeric',
			month: 'numeric',
			day: 'numeric',
		})
		.split('/')
		.join('-');
};

function SKPAir({ importir, shipment, ppjk }) {
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
			<h3 className="mt-32 text-center text-base font-bold uppercase text-black underline">
				<strong className="block">Surat Kuasa</strong>
				<strong>PELAKSANAAN PENGURUSAN DOKUMEN DAN BARANG IMPOR/EKSPOR</strong>
			</h3>
			<p className="text-center font-bold">No:</p>
			<div className="mt-4 text-sm">
				<div>
					<p>Kami yang bertanda tangan di bawah ini :</p>
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
								<p>No. EDI</p>
								<p className="col-span-4 col-start-3">: {ppjk.edi}</p>
							</div>
						</li>
						<li>
							<div className="grid grid-cols-12">
								<p className="col-span-2">Telp/Fax</p>
								<p className="col-span-3 col-start-3">
									: {importir !== null ? importir.phone : '__'}
								</p>
							</div>
						</li>
					</ol>
				</div>
				<div className="mt-8">
					<p>Selanjutnya dalam Surat Kuasa ini disebut sebagai PENERIMA KUASA, guna bertindak</p>
					<p>atas nama PEMBERI KUASA untuk mentransfer data PIB pada Kantor Pelayanan </p>
					<p>Bea dan Cukai yang bersangkutan atas import/eksport barang tersebut di bawah ini :</p>
					<ol className="pl-4 pt-4">
						<li>
							<div className="grid grid-cols-12">
								<p className="col-span-2">Pemasok</p>
								<p className="col-span-6 col-start-3 uppercase">
									: {importir !== null ? importir.company : '__'}
								</p>
							</div>
						</li>
						<li>
							<div className="grid grid-cols-12">
								<p className="col-span-2">Nama Barang</p>
								<p className="col-span-6 col-start-3 uppercase">
									: {shipment !== null ? shipment.goods : '__'}
								</p>
							</div>
						</li>
						<li>
							<div className="grid grid-cols-12">
								<p className="col-span-2">Party / GW</p>
								<p className="col-span-7 col-start-3">
									: {shipment !== null ? shipment.container : '__'}
								</p>
							</div>
						</li>
						<li>
							<div className="grid grid-cols-12">
								<p className="col-span-2">Flight</p>
								<p className="col-span-7 col-start-3">
									: {shipment !== null ? shipment.flight : '__'}
								</p>
							</div>
						</li>
						<li>
							<div className="grid grid-cols-12">
								<p className="col-span-2">AWB / Tgl</p>
								<div className="col-span-7 col-start-3">
									<p>
										: {shipment !== null ? shipment.tracking : '__'} /{' '}
										{shipment !== null ? formatDate(shipment.trackingDate) : '__'}
									</p>
								</div>
							</div>
						</li>
						<li>
							<div className="grid grid-cols-12">
								<p className="col-span-2">No / Tgl Invoice</p>
								<div className="col-span-7 col-start-3 flex justify-between">
									<p>
										: {shipment !== null ? shipment.invoice : '__'} /{' '}
										{shipment !== null ? formatDate(shipment.invoiceDate) : '__'}
									</p>
								</div>
							</div>
						</li>
						<li>
							<div className="grid grid-cols-12">
								<p className="col-span-2">Dok. Pelengkap</p>
								<p className="col-span-7 col-start-3">: Terlampir</p>
							</div>
						</li>
					</ol>
				</div>
				<div className="mt-8">
					<p>Pemberi kuasa dengan ini menyatakan :</p>
					<ul className="list-decimal pl-4">
						<li className="text-justify">
							<p>
								BERTANGGUNG JAWAB SEPENUHNYA ATAS SEGALA KEWAJIBAN KEPABEANAN SEBAGAIMANA DIMAKSUD
								DALAM UNDANG-UNDANG NO.10 TAHUN 1995 TENTANG KEPABEANAN.
							</p>
						</li>
						<li className="text-justify">
							<p>
								KEBENARAN DAN KEABSAHAN DOKUMEN MELIPUTI : HARGA DAN FISIK BARANG YANG DIIMPOR
								ADALAH SEPENUHNYA MENJADI TANGGUNG JAWAB KAMI SEBAGAI IMPORTIR DAN MEMBEBASKAN
							</p>
						</li>
					</ul>
				</div>
				<div className="mt-12">
					<p>Demikian Surat Kuasa ini kami buat agar dipergunakan sebagaimana mestinya.</p>
					<div className="mt-8">
						<p className="text-right">Jakarta, {now}</p>
						<div className="flex justify-between">
							<div>
								<p>Yang Menerima Kuasa,</p>
								<p className="mt-32 font-bold">
									{shipment !== null ? ppjk.type[shipment.type].name : '__'}
								</p>
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
	);
}

export default SKPAir;