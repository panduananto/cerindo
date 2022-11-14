import React from 'react';

function SKP() {
	let now = new Date();
	return (
		<div className="font-serif">
			<h3 className="text-center text-base font-bold text-black underline">
				<strong>SURAT KUASA PENGAMBILAN DO</strong>
			</h3>
			<div>
				<div>
					<p>Yang bertanda tangan di bawah ini:</p>
					<ol className="pl-4">
						<li>
							<div className="grid grid-cols-12">
								<p>Nama</p>
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
								<p>NPWP</p>
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
								<p>No. Tlp.</p>
								<p className="col-start-3">:</p>
							</div>
						</li>
					</ol>
				</div>
				<div className="mt-8">
					<p>Dengan ini memberikan kuasa kepada:</p>
					<ol className="pl-4">
						<li>
							<div className="grid grid-cols-12">
								<p className="col-span-2">Nama PPJK</p>
								<p className="col-start-3">:</p>
							</div>
						</li>
						<li>
							<div className="grid grid-cols-12">
								<p>NPWP</p>
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
								<p>Nama</p>
								<p className="col-start-3">:</p>
							</div>
						</li>
						<li>
							<div className="grid grid-cols-12">
								<p>Jabatan</p>
								<p className="col-start-3">:</p>
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
								<p className="col-start-3">:</p>
							</div>
						</li>
						<li>
							<div className="grid grid-cols-12">
								<p className="col-span-2">Nama Barang</p>
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
								<p className="col-span-2">Vessel / ETA</p>
								<p className="col-start-3">:</p>
							</div>
						</li>
						<li>
							<div className="grid grid-cols-12">
								<p>B/L</p>
								<p className="col-start-3">:</p>
							</div>
						</li>
					</ol>
				</div>
				<div className="mt-12">
					<p>Demikian Surat Kuasa ini kami buat dengan sebenarnya untuk dapat dipergunakan</p>
					<p>sebagaimana mestinya.</p>
					<div className="mt-8">
						<p className="text-right">
							Jakarta,{' '}
							{new Date()
								.toLocaleString('id', {
									year: 'numeric',
									month: 'short',
									day: 'numeric',
								})
								.split(' ')
								.join('-')}
						</p>
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
