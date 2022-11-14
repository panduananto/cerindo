import React, { useState } from 'react';

import { Tab } from '@headlessui/react';

import SKP from '../../components/Dashboard/SKPabean/SKP';
import SKDO from '../../components/Dashboard/SKPabean/SKDO';
import ImportirForm from '../../components/Dashboard/SKPabean/ImportirForm';
import ShipmentForm from '../../components/Dashboard/SKPabean/ShipmentForm';

import classNames from '../../utils/classNames';

const TAB_SK_PABEAN = ['SKP', 'SKDO', 'DNP', 'SKDAI'];
const PPJK_DATA = {
	company: 'PT. CERINDO PRIMA LOGISTIK',
	address:
		'Jalan Seulawah Raya Kompl. Puri Sentra Niaga B-37 LT.1 RT.12 RW.07 Cipinang Melayu, Makasar, Jakarta Timur',
	npwp: '02.444.890.4-005.000',
	type: {
		sea: {
			name: 'Gino / Dendi Irawan',
			title: 'Staff Ops',
		},
		air: {
			name: 'Eka Susilo',
			title: 'Manager Operasional',
		},
	},
};

function SKPabean() {
	const [importir, setImportir] = useState(null);
	const [shipment, setShipment] = useState(null);

	const handleSubmitImportir = (values, action) => {
		setImportir(values);
	};

	const handleSubmitShipment = (values, action) => {
		setShipment(values);
	};

	return (
		<div className="h-[calc(100vh-65px)] w-full overflow-y-auto bg-slate-100">
			<div className="px-8 py-8 sm:px-10 lg:px-12">
				<h1 className="text-xl font-semibold leading-8 sm:text-2xl 2md:text-3xl">
					Pembuatan Dokumen SK Pabean
				</h1>
				<p className="mt-1 font-medium text-slate-700">
					Buat dokumen SK Pabean yang Anda butuhkan dengan mudah
				</p>
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
											: 'text-slate-500 hover:border-red-600 hover:bg-red-600 hover:text-white'
									)
								}
							>
								{tab}
							</Tab>
						))}
					</Tab.List>
					<Tab.Panels className="mx-auto w-min py-8">
						<Tab.Panel className="w-[46rem] bg-white py-4 px-8">
							<SKP importir={importir} shipment={shipment} ppjk={PPJK_DATA} />
						</Tab.Panel>
						<Tab.Panel className="w-[40rem] bg-white py-4 px-8">
							<SKDO />
						</Tab.Panel>
						<Tab.Panel className="bg-white p-4">DNP</Tab.Panel>
						<Tab.Panel className="bg-white p-4">SKDAI</Tab.Panel>
					</Tab.Panels>
				</Tab.Group>
			</div>
		</div>
	);
}

export default SKPabean;
