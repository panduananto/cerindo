import React, { useMemo } from 'react';

import JSZip from 'jszip';
import FileSaver from 'file-saver';

import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { utils, writeFile } from 'xlsx';
import { Popover, Transition } from '@headlessui/react';
import { HiExclamationCircle, HiDotsVertical, HiCheckCircle } from 'react-icons/hi';

import {
	aklClearAll,
	selectAklsCollection,
} from '../../../features/akl/collection/aklCollectionSlice';
import { aklAPI } from '../../../api/akl';

const DATE_OPTIONS = { year: 'numeric', month: '2-digit', day: '2-digit' };

const downloadAklFile = async (fileUrl) => {
	try {
		const response = await aklAPI.downloadFile(fileUrl);
		return response.data;
	} catch (error) {
		return error.message;
	}
};

function AklTableFooter() {
	const dispatch = useDispatch();
	const aklsCollection = useSelector(selectAklsCollection);

	const distinctAkl = useMemo(
		() => [...new Set(aklsCollection.map((item) => item.akl))],
		[aklsCollection]
	);

	const handleResetTable = () => {
		dispatch(aklClearAll());
	};

	const handleDownloadExcel = () => {
		const headerItems = [
			[
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
			],
		];
		const headerAKL = [['KODE AKL', 'TANGGAL TERBIT', 'TANGGAL KADALUARSA']];

		const workbook = utils.book_new();

		if (aklsCollection.length === 0) {
			toast.error('Barang atau AKL masih kosong', {
				icon: <HiExclamationCircle className="h-5 w-5 text-red-600" />,
			});

			return;
		}

		const rowsItems = aklsCollection.map((item) => ({
			countryCode: item.country.code,
			type: item.type,
			brandName: item.akl.brand_name,
			packaging: `KEMASAN : ${item.akl.packaging}`,
			hsCode: item.hscode.code,
			importDutyFees: item.hscode.import_dutyfees,
			valueAddedTax: item.hscode.value_added_tax,
			incomeTaxApi: item.hscode.income_tax_api,
			incomeTaxNonApi: item.hscode.income_tax_non_api,
			lartas: item.hscode.lartas,
			facility: item.facility,
		}));

		const rowsAKL = aklsCollection.map((item) => {
			return {
				aklCode: item.akl.id.split('_').join(' '),
				date: new Date(item.akl.date).toLocaleDateString('id', DATE_OPTIONS),
				expiryDate: new Date(item.akl.expiry_date).toLocaleDateString('id', DATE_OPTIONS),
			};
		});

		const worksheetItems = utils.json_to_sheet(rowsItems);
		const worksheetAKL = utils.json_to_sheet(rowsAKL);

		utils.book_append_sheet(workbook, worksheetItems, 'BARANG');
		utils.book_append_sheet(workbook, worksheetAKL, 'AKL');

		utils.sheet_add_aoa(worksheetItems, headerItems, { origin: 'A1' });
		utils.sheet_add_aoa(worksheetAKL, headerAKL, { origin: 'A1' });

		writeFile(workbook, 'TABEL BARANG.xlsx');
	};

	const handleDownloadZipAKL = async () => {
		if (distinctAkl.length === 0) {
			toast.error('AKL masih kosong', {
				icon: <HiExclamationCircle className="h-5 w-5 text-red-600" />,
			});

			return;
		}

		const zip = new JSZip();

		const requests = distinctAkl.map((akl) => {
			return downloadAklFile(akl.file_url).then((file) => {
				return {
					id: akl.id,
					data: file,
				};
			});
		});

		toast
			.promise(Promise.all(requests), {
				pending: {
					render() {
						return 'Mengunduh AKL...';
					},
				},
				success: {
					render() {
						return 'AKL berhasil diunduh.';
					},
					icon: <HiCheckCircle className="h-5 w-5 text-green-600" />,
				},
				error: {
					renter() {
						return 'Maaf, ada kesalahan. Coba lagi.';
					},
					icon: <HiExclamationCircle className="h-5 w-5 text-red-600" />,
				},
			})
			.then((pdfs) => {
				pdfs.map((pdf) => {
					zip.file(`${pdf.id}.pdf`, pdf.data, { binary: true });
					return null;
				});
			})
			.then(() => {
				zip.generateAsync({ type: 'Blob' }).then((content) => {
					FileSaver.saveAs(content, 'AKL.zip');
				});
			});
	};

	return (
		<div className="mt-auto flex items-center justify-between border-t border-slate-300 bg-white px-4 py-1 sm:px-6 lg:px-8 2md:py-3">
			<p className="text-[13px] text-slate-700">
				<span className="font-extrabold">{aklsCollection.length}</span> barang dan{' '}
				<span className="font-extrabold">{distinctAkl.length}</span> izin AKL terpilih
			</p>
			<div className="block 2md:hidden">
				<Popover className="relative">
					<React.Fragment>
						<Popover.Button className="inline-flex items-center justify-center rounded bg-white p-2 text-slate-500 transition-colors duration-150 ease-in-out hover:bg-slate-100 hover:text-slate-600 focus:bg-slate-100 focus:outline-none focus:ring-0">
							<HiDotsVertical className="h-6 w-6" />
						</Popover.Button>
						<Transition
							as={React.Fragment}
							enter="transition ease-out duration-200"
							enterFrom="opacity-0 translate-y-1"
							enterTo="opacity-100 translate-y-0"
							leave="transition ease-in duration-150"
							leaveFrom="opacity-100 translate-y-0"
							leaveTo="opacity-0 translate-y-1"
						>
							<Popover.Panel className="absolute -left-[67px] bottom-10 z-10 mb-2 w-[215px] max-w-[240px] -translate-x-1/2 transform">
								<div className="overflow-hidden rounded border border-slate-200 shadow-lg">
									<div className="space-y-2 divide-y divide-slate-200 bg-white py-2 text-slate-700">
										<ul>
											<li>
												<button
													disabled={distinctAkl.length === 0 ? true : false}
													className="flex w-full items-center rounded px-4 py-2 text-sm font-medium leading-5 hover:enabled:bg-red-50 hover:enabled:text-red-600 disabled:cursor-not-allowed disabled:text-slate-300"
													onClick={() => handleDownloadZipAKL()}
												>
													Download AKL &#40;.zip&#41;
												</button>
											</li>
											<li>
												<button
													disabled={aklsCollection.length === 0 ? true : false}
													className="flex w-full items-center rounded px-4 py-2 text-sm font-medium leading-5 hover:enabled:bg-red-50 hover:enabled:text-red-600 disabled:cursor-not-allowed disabled:text-slate-300"
													onClick={() => handleDownloadExcel()}
												>
													Download excel &#40;.xlsx&#41;
												</button>
											</li>
										</ul>
										<div className="pt-2">
											<button
												disabled={
													aklsCollection.length === 0 || aklsCollection.length === 0 ? true : false
												}
												className="flex w-full items-center rounded px-4 py-2 text-sm font-medium leading-5 hover:enabled:bg-red-50 hover:enabled:text-red-600 disabled:cursor-not-allowed disabled:text-slate-300"
												onClick={handleResetTable}
											>
												<span className="pl-0">Reset tabel</span>
											</button>
										</div>
									</div>
								</div>
							</Popover.Panel>
						</Transition>
					</React.Fragment>
				</Popover>
			</div>
			<div className="hidden space-x-2 text-[13px] font-medium text-slate-700 2md:block">
				<button
					disabled={distinctAkl.length === 0 ? true : false}
					className="inline-flex items-center justify-center rounded border border-slate-300 px-2 py-1 transition-colors duration-150 ease-in-out hover:enabled:bg-slate-100 hover:enabled:text-red-600 disabled:cursor-not-allowed disabled:text-slate-300"
					onClick={() => handleDownloadZipAKL()}
				>
					Download AKL &#40;.zip&#41;
				</button>
				<button
					disabled={aklsCollection.length === 0 ? true : false}
					className="inline-flex items-center justify-center rounded border border-slate-300 px-2 py-1 transition-colors duration-150 ease-in-out hover:enabled:bg-slate-100 hover:enabled:text-red-600 disabled:cursor-not-allowed disabled:text-slate-300"
					onClick={() => handleDownloadExcel()}
				>
					Download excel &#40;.xlsx&#41;
				</button>
				<span>|</span>
				<button
					disabled={aklsCollection.length === 0 || aklsCollection.length === 0 ? true : false}
					className="inline-flex items-center justify-center rounded border border-red-300 bg-white px-2 py-1 text-red-600 transition-colors duration-150 ease-in-out focus:bg-red-200/70 focus:outline-none focus:ring-0 hover:enabled:bg-red-200/70 disabled:cursor-not-allowed disabled:text-red-300"
					onClick={handleResetTable}
				>
					Reset tabel
				</button>
			</div>
		</div>
	);
}

export default AklTableFooter;
