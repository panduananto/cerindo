import React, { useState } from 'react';

import { RadioGroup, Tab } from '@headlessui/react';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { object, string, boolean, date } from 'yup';
import { HiCheckCircle } from 'react-icons/hi';
import ReactDatePicker from 'react-datepicker';

import classNames from '../../utils/classNames';

import 'react-datepicker/dist/react-datepicker.css';

const importirSchema = object().shape({
	pic: string().required('Nama PIC harus diisi'),
	title: string().required('Jabatan PIC harus diisi'),
	company: string().required('Nama perusahaan importir harus diisi'),
	npwp: string()
		.required('NPWP perusahaan importir harus diisi')
		.min(15, 'NPWP minimal harus 15 digit'),
	address: string().required('Alamat perusahaan importir harus diisi'),
});

const ppjkSchema = object().shape({
	type: boolean().required('Jenis shipment harus dipilih').oneOf([0, 1]),
	goods: string().required('Nama barang harus diisi').max(30, 'Nama barang maksimal 30 karakter'),
	container: string().nullable().notRequired(),
	vessel: string().required('Nama vessel harus diisi'),
	eta: date().required('ETA harus disebutkan'),
	bl: string().required('Nomor B/L harus diisi'),
	blDate: date().required('Tanggal B/L harus disebutkan'),
});

const TAB_SK_PABEAN = ['SKP', 'SKDO', 'DNP', 'SKDAI'];

function SKPabean() {
	const [importir, setImportir] = useState(null);

	const handleSubmitImportir = (values, action) => {
		setImportir(values);
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
						<div className="col-span-3 md:col-span-1">
							<h2 className="font-semibold leading-8">Importir</h2>
							<p className="text-sm text-slate-600">
								Pengisian data importir, harap pastikan data yang diisi adalah benar.
							</p>
						</div>
						<div className="col-span-3 rounded bg-white shadow-sm md:col-span-2">
							<Formik
								initialValues={{ pic: '', title: '', company: '', npwp: '', address: '' }}
								validationSchema={importirSchema}
								onSubmit={(values, action) => handleSubmitImportir(values, action)}
							>
								{({ errors, touched }) => {
									return (
										<Form>
											<div className="p-6">
												<div className="grid grid-cols-6 gap-x-4 gap-y-6">
													<div className="col-span-3">
														<label
															htmlFor="pic"
															className="mb-2 block text-sm font-medium text-slate-900"
														>
															Nama Direksi
															<span
																className={classNames(
																	errors.pic && touched.pic ? 'text-red-600' : ''
																)}
															>
																{' '}
																*
															</span>
														</label>
														<Field
															type="pic"
															id="pic"
															name="pic"
															placeholder="Masukkan nama direksi perusahaan importir..."
															className={classNames(
																'block w-full rounded border bg-white py-2 px-3 text-sm text-slate-900 focus:border-red-600 focus:outline-none focus:ring-1 focus:ring-red-600 sm:bg-slate-50',
																errors.pic && touched.pic
																	? 'border-red-600 ring-red-600'
																	: 'border-slate-300'
															)}
															autoComplete="off"
															aria-invalid={errors.pic && touched.pic ? false : true}
															aria-describedby="picNote"
														></Field>
														<ErrorMessage
															id="picNote"
															name="pic"
															component="span"
															className="mt-1 text-xs font-semibold text-red-600"
														/>
													</div>
													<div className="col-span-3">
														<label
															htmlFor="title"
															className="mb-2 block text-sm font-medium text-slate-900"
														>
															Jabatan Direksi
															<span
																className={classNames(
																	errors.title && touched.title ? 'text-red-600' : ''
																)}
															>
																{' '}
																*
															</span>
														</label>
														<Field
															type="title"
															id="title"
															name="title"
															placeholder="Masukkan jabatan pic perusahaan importir..."
															className={classNames(
																'block w-full rounded border bg-white py-2 px-3 text-sm text-slate-900 focus:border-red-600 focus:outline-none focus:ring-1 focus:ring-red-600 sm:bg-slate-50',
																errors.title && touched.title
																	? 'border-red-600 ring-red-600'
																	: 'border-slate-300'
															)}
															autoComplete="off"
															aria-invalid={errors.title && touched.title ? false : true}
															aria-describedby="picNote"
														></Field>
														<ErrorMessage
															id="titleNote"
															name="title"
															component="span"
															className="mt-1 text-xs font-semibold text-red-600"
														/>
													</div>
													<div className="col-span-6">
														<label
															htmlFor="company"
															className="mb-2 block text-sm font-medium text-slate-900"
														>
															Nama Perusahaan Importir
															<span
																className={classNames(
																	errors.company && touched.company ? 'text-red-600' : ''
																)}
															>
																{' '}
																*
															</span>
														</label>
														<Field
															type="company"
															id="company"
															name="company"
															placeholder="Masukkan nama direksi perusahaan importir..."
															className={classNames(
																'block w-full rounded border bg-white py-2 px-3 text-sm text-slate-900 focus:border-red-600 focus:outline-none focus:ring-1 focus:ring-red-600 sm:bg-slate-50',
																errors.company && touched.company
																	? 'border-red-600 ring-red-600'
																	: 'border-slate-300'
															)}
															autoComplete="off"
															aria-invalid={errors.company && touched.company ? false : true}
															aria-describedby="picNote"
														></Field>
														<ErrorMessage
															id="companyNote"
															name="company"
															component="span"
															className="mt-1 text-xs font-semibold text-red-600"
														/>
													</div>
													<div className="col-span-6">
														<label
															htmlFor="npwp"
															className="mb-2 block text-sm font-medium text-slate-900"
														>
															NPWP Perusahaan Importir
															<span
																className={classNames(
																	errors.npwp && touched.npwp ? 'text-red-600' : ''
																)}
															>
																{' '}
																*
															</span>
														</label>
														<Field
															type="npwp"
															id="npwp"
															name="npwp"
															placeholder="Masukkan npwp perusahaan importir..."
															className={classNames(
																'block w-full rounded border bg-white py-2 px-3 text-sm text-slate-900 focus:border-red-600 focus:outline-none focus:ring-1 focus:ring-red-600 sm:bg-slate-50',
																errors.npwp && touched.npwp
																	? 'border-red-600 ring-red-600'
																	: 'border-slate-300'
															)}
															autoComplete="off"
															aria-invalid={errors.npwp && touched.npwp ? false : true}
															aria-describedby="picNote"
														></Field>
														<ErrorMessage
															id="npwpNote"
															name="npwp"
															component="span"
															className="mt-1 text-xs font-semibold text-red-600"
														/>
													</div>
													<div className="col-span-6">
														<label
															htmlFor="address"
															className="mb-2 block text-sm font-medium text-slate-900"
														>
															Alamat Perusahaan Importir
															<span
																className={classNames(
																	errors.address && touched.address ? 'text-red-600' : ''
																)}
															>
																{' '}
																*
															</span>
														</label>
														<Field
															as="textarea"
															rows="4"
															type="address"
															id="address"
															name="address"
															placeholder="Masukkan alamat perusahaan importir..."
															className={classNames(
																'block w-full rounded border bg-white py-2 px-3 text-sm text-slate-900 focus:border-red-600 focus:outline-none focus:ring-1 focus:ring-red-600 sm:bg-slate-50',
																errors.address && touched.address
																	? 'border-red-600 ring-red-600'
																	: 'border-slate-300'
															)}
															autoComplete="off"
															aria-invalid={errors.address && touched.address ? false : true}
															aria-describedby="picNote"
														></Field>
														<ErrorMessage
															id="addressNote"
															name="address"
															component="span"
															className="mt-1 text-xs font-semibold text-red-600"
														/>
													</div>
												</div>
											</div>
											<div className="flex justify-end space-x-2 border-t border-slate-200 p-4">
												<button
													type="submit"
													className="inline-flex items-center justify-center rounded border border-slate-200 bg-white py-2 px-4 text-sm font-medium text-slate-900 hover:bg-slate-100 hover:text-red-600 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2"
												>
													Reset
												</button>
												<button
													type="submit"
													className="inline-flex items-center justify-center rounded bg-red-600 py-2 px-4 text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2"
												>
													Update
												</button>
											</div>
										</Form>
									);
								}}
							</Formik>
						</div>
					</div>
					<div className="hidden sm:block">
						<div className="py-5">
							<div className="border-t border-slate-200"></div>
						</div>
					</div>
					<div className="grid grid-cols-3 gap-x-6">
						<div className="col-span-3 md:col-span-1">
							<h2 className="font-semibold leading-8">Shipment</h2>
							<p className="text-sm text-slate-600">
								Pengisian data shipment, harap pastikan data yang diisi adalah benar.
							</p>
						</div>
						<div className="col-span-3 rounded bg-white shadow-sm md:col-span-2">
							<Formik
								initialValues={{
									type: '',
									goods: '',
									container: '',
									vessel: '',
									eta: '',
									bl: '',
									blDate: '',
								}}
								validationSchema={ppjkSchema}
							>
								{({ errors, touched, values, setFieldValue }) => {
									return (
										<Form>
											<div className="p-6">
												<div className="grid grid-cols-6 gap-x-4 gap-y-6">
													<div className="col-span-6">
														<RadioGroup
															value={values.type}
															onChange={(type) => setFieldValue('type', type)}
														>
															<RadioGroup.Label
																htmlFor="type"
																className="mb-2 block text-sm font-medium text-slate-900"
															>
																Jenis Shipment
															</RadioGroup.Label>
															<div className="flex items-center justify-between space-x-2">
																<RadioGroup.Option
																	value="air"
																	className={({ checked }) =>
																		`${
																			checked ? 'border-red-600 bg-red-100' : 'border-slate-300'
																		} w-full cursor-pointer rounded border  p-4 hover:border-red-600 hover:bg-red-100`
																	}
																>
																	{({ checked }) => (
																		<div className="flex w-full items-center justify-between">
																			<RadioGroup.Label as="span">Air</RadioGroup.Label>
																			{checked && (
																				<div className="shrink-0">
																					<HiCheckCircle className="h-6 w-6 text-red-600" />
																				</div>
																			)}
																		</div>
																	)}
																</RadioGroup.Option>
																<RadioGroup.Option
																	value="sea"
																	className={({ checked }) =>
																		`${
																			checked ? 'border-red-600 bg-red-100' : 'border-slate-300'
																		} w-full cursor-pointer rounded border  p-4 hover:border-red-600 hover:bg-red-100`
																	}
																>
																	{({ checked }) => (
																		<div className="flex w-full items-center justify-between">
																			<RadioGroup.Label as="span">Sea</RadioGroup.Label>
																			{checked && (
																				<div className="shrink-0">
																					<HiCheckCircle className="h-6 w-6 text-red-600" />
																				</div>
																			)}
																		</div>
																	)}
																</RadioGroup.Option>
															</div>
														</RadioGroup>
														<ErrorMessage
															id="typeNote"
															name="note"
															component="span"
															className="mt-1 text-xs font-semibold text-red-600"
														/>
													</div>
													<div className="col-span-6">
														<label
															htmlFor="goods"
															className="mb-2 block text-sm font-medium text-slate-900"
														>
															Nama Barang
															<span
																className={classNames(
																	errors.goods && touched.goods ? 'text-red-600' : ''
																)}
															>
																{' '}
																*
															</span>
														</label>
														<Field
															as="textarea"
															rows="4"
															type="goods"
															id="goods"
															name="goods"
															placeholder="Masukkan nama barang..."
															className={classNames(
																'block w-full rounded border bg-white py-2 px-3 text-sm text-slate-900 focus:border-red-600 focus:outline-none focus:ring-1 focus:ring-red-600 sm:bg-slate-50',
																errors.goods && touched.goods
																	? 'border-red-600 ring-red-600'
																	: 'border-slate-300'
															)}
															autoComplete="off"
															aria-invalid={errors.goods && touched.goods ? false : true}
															aria-describedby="picNote"
														></Field>
														<ErrorMessage
															id="goodsNote"
															name="goods"
															component="span"
															className="mt-1 text-xs font-semibold text-red-600"
														/>
													</div>
													<div className="col-span-6">
														<label
															htmlFor="container"
															className="mb-2 block text-sm font-medium text-slate-900"
														>
															Party / Cont
														</label>
														<Field
															type="container"
															id="container"
															name="container"
															placeholder="Masukkan deskripsi container..."
															className={classNames(
																'block w-full rounded border bg-white py-2 px-3 text-sm text-slate-900 focus:border-red-600 focus:outline-none focus:ring-1 focus:ring-red-600 sm:bg-slate-50',
																errors.container && touched.container
																	? 'border-red-600 ring-red-600'
																	: 'border-slate-300'
															)}
															autoComplete="off"
															aria-invalid={errors.container && touched.container ? false : true}
															aria-describedby="picNote"
														></Field>
														<ErrorMessage
															id="containerNote"
															name="container"
															component="span"
															className="mt-1 text-xs font-semibold text-red-600"
														/>
													</div>
													<div className="col-span-4">
														<label
															htmlFor="vessel"
															className="mb-2 block text-sm font-medium text-slate-900"
														>
															Vessel
															<span
																className={classNames(
																	errors.vessel && touched.vessel ? 'text-red-600' : ''
																)}
															>
																{' '}
																*
															</span>
														</label>
														<Field
															type="vessel"
															id="vessel"
															name="vessel"
															placeholder="Masukkan nama vessel pengangkut barang..."
															className={classNames(
																'block w-full rounded border bg-white py-2 px-3 text-sm text-slate-900 focus:border-red-600 focus:outline-none focus:ring-1 focus:ring-red-600 sm:bg-slate-50',
																errors.vessel && touched.vessel
																	? 'border-red-600 ring-red-600'
																	: 'border-slate-300'
															)}
															autoComplete="off"
															aria-invalid={errors.vessel && touched.vessel ? false : true}
															aria-describedby="picNote"
														></Field>
														<ErrorMessage
															id="vesselNote"
															name="vessel"
															component="span"
															className="mt-1 text-xs font-semibold text-red-600"
														/>
													</div>
													<div className="col-span-2">
														<label
															htmlFor="container"
															className="mb-2 block text-sm font-medium text-slate-900"
														>
															ETA
														</label>
														<ReactDatePicker
															selected={values.eta}
															dateFormat="dd/MM/yy"
															className="form-control block w-full rounded border border-slate-300 bg-white py-2 px-3 text-sm text-slate-900 focus:border-red-600 focus:outline-none focus:ring-1 focus:ring-red-600 sm:bg-slate-50"
															name="eta"
															onChange={(date) => setFieldValue('eta', date)}
														/>
														<ErrorMessage
															id="etaNote"
															name="eta"
															component="span"
															className="mt-1 text-xs font-semibold text-red-600"
														/>
													</div>
													<div className="col-span-4">
														<label
															htmlFor="goods"
															className="mb-2 block text-sm font-medium text-slate-900"
														>
															B/L
															<span
																className={classNames(
																	errors.bl && touched.bl ? 'text-red-600' : ''
																)}
															>
																{' '}
																*
															</span>
														</label>
														<Field
															type="bl"
															id="bl"
															name="bl"
															placeholder="Masukkan nomor B/L..."
															className={classNames(
																'block w-full rounded border bg-white py-2 px-3 text-sm text-slate-900 focus:border-red-600 focus:outline-none focus:ring-1 focus:ring-red-600 sm:bg-slate-50',
																errors.bl && touched.bl
																	? 'border-red-600 ring-red-600'
																	: 'border-slate-300'
															)}
															autoComplete="off"
															aria-invalid={errors.bl && touched.bl ? false : true}
															aria-describedby="picNote"
														></Field>
														<ErrorMessage
															id="blNote"
															name="bl"
															component="span"
															className="mt-1 text-xs font-semibold text-red-600"
														/>
													</div>
													<div className="col-span-2">
														<label
															htmlFor="container"
															className="mb-2 block text-sm font-medium text-slate-900"
														>
															Tanggal B/L
														</label>
														<ReactDatePicker
															selected={values.blDate}
															dateFormat="dd/MM/yy"
															className="form-control block w-full rounded border border-slate-300 bg-white py-2 px-3 text-sm text-slate-900 focus:border-red-600 focus:outline-none focus:ring-1 focus:ring-red-600 sm:bg-slate-50"
															name="eta"
															onChange={(blDate) => setFieldValue('blDate', blDate)}
														/>
														<ErrorMessage
															id="etaNote"
															name="eta"
															component="span"
															className="mt-1 text-xs font-semibold text-red-600"
														/>
													</div>
												</div>
											</div>
											<div className="flex justify-end space-x-2 border-t border-slate-200 p-4">
												<button
													type="submit"
													className="inline-flex items-center justify-center rounded border border-slate-200 bg-white py-2 px-4 text-sm font-medium text-slate-900 hover:bg-slate-100 hover:text-red-600 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2"
												>
													Reset
												</button>
												<button
													type="submit"
													className="inline-flex items-center justify-center rounded bg-red-600 py-2 px-4 text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2"
												>
													Update
												</button>
											</div>
										</Form>
									);
								}}
							</Formik>
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
					<Tab.Panels className="px-8 py-4">
						<Tab.Panel className="bg-white p-4">
							{importir !== null ? importir.pic : 'null'}
						</Tab.Panel>
						<Tab.Panel className="bg-white p-4">SKDO</Tab.Panel>
						<Tab.Panel className="bg-white p-4">DNP</Tab.Panel>
						<Tab.Panel className="bg-white p-4">SKDAI</Tab.Panel>
					</Tab.Panels>
				</Tab.Group>
			</div>
		</div>
	);
}

export default SKPabean;
