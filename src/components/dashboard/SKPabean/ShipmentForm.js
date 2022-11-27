import React from 'react';

import ReactDatePicker from 'react-datepicker';
import { RadioGroup } from '@headlessui/react';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { HiCheckCircle } from 'react-icons/hi';
import { object, string, mixed, date } from 'yup';

import classNames from '../../../utils/classNames';

import 'react-datepicker/dist/react-datepicker.css';

const shipmentSchema = object().shape({
	type: mixed().oneOf(['sea', 'air']).required('Jenis shipment harus dipilih'),
	flight: string().when('type', {
		is: 'air',
		then: string().required('Kode penerbangan harus diisi'),
	}),
	goods: string().required('Nama barang harus diisi').max(50, 'Nama barang maksimal 50 karakter'),
	container: string().nullable().notRequired(),
	vessel: string().required('Nama vessel harus diisi'),
	eta: date().required('ETA harus disebutkan'),
	tracking: string().required('Nomor B/L atau AWB harus diisi'),
	trackingDate: date().required('Tanggal B/L harus disebutkan'),
	invoice: string().required('Nomor Invoice harus diisi'),
	invoiceDate: date().required('Tanggal Invoice harus disebutkan'),
	price: string().required('Harga barang harus diisi'),
});

function ShipmentForm({ handleSubmitShipment }) {
	return (
		<Formik
			initialValues={{
				type: '',
				flight: '',
				goods: '',
				container: '',
				vessel: '',
				eta: '',
				tracking: '',
				trackingDate: '',
				invoice: '',
				invoiceDate: '',
				price: '',
			}}
			validationSchema={shipmentSchema}
			onSubmit={(values, action) => handleSubmitShipment(values, action)}
		>
			{({ errors, touched, values, setFieldValue }) => {
				return (
					<Form>
						<div className="p-6">
							<div className="grid grid-cols-6 gap-x-4 gap-y-6">
								<div className="col-span-6">
									<RadioGroup value={values.type} onChange={(type) => setFieldValue('type', type)}>
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
										name="type"
										component="span"
										className="mt-1 text-xs font-semibold text-red-600"
									/>
								</div>
								{values.type === 'air' ? (
									<div className="col-span-6 2md:col-span-4">
										<label
											htmlFor="flight"
											className="mb-2 block text-sm font-medium text-slate-900"
										>
											Kode Penerbangan
											<span
												className={classNames(
													errors.flight && touched.flight ? 'text-red-600' : ''
												)}
											>
												{' '}
												*
											</span>
										</label>
										<Field
											type="flight"
											id="flight"
											name="flight"
											placeholder="Masukkan kode penerbangan..."
											className={classNames(
												'block w-full rounded border bg-white py-2 px-3 text-sm text-slate-900 focus:border-red-600 focus:outline-none focus:ring-1 focus:ring-red-600 sm:bg-slate-50',
												errors.flight && touched.flight
													? 'border-red-600 ring-red-600'
													: 'border-slate-300'
											)}
											autoComplete="off"
											aria-invalid={errors.flight && touched.flight ? false : true}
											aria-describedby="flightNote"
										></Field>
										<ErrorMessage
											id="flightNote"
											name="flight"
											component="span"
											className="mt-1 text-xs font-semibold text-red-600"
										/>
									</div>
								) : null}
								<div className="col-span-6">
									<label htmlFor="goods" className="mb-2 block text-sm font-medium text-slate-900">
										Nama Barang
										<span
											className={classNames(errors.goods && touched.goods ? 'text-red-600' : '')}
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
										aria-describedby="goodsNote"
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
										aria-describedby="containerNote"
									></Field>
									<ErrorMessage
										id="containerNote"
										name="container"
										component="span"
										className="mt-1 text-xs font-semibold text-red-600"
									/>
								</div>
								<div className="col-span-4">
									<label htmlFor="vessel" className="mb-2 block text-sm font-medium text-slate-900">
										Vessel
										<span
											className={classNames(errors.vessel && touched.vessel ? 'text-red-600' : '')}
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
										aria-describedby="vesselNote"
									></Field>
									<ErrorMessage
										id="vesselNote"
										name="vessel"
										component="span"
										className="mt-1 text-xs font-semibold text-red-600"
									/>
								</div>
								<div className="col-span-2">
									<label htmlFor="eta" className="mb-2 block text-sm font-medium text-slate-900">
										ETA
									</label>
									<ReactDatePicker
										selected={values.eta}
										dateFormat="dd/MM/yy"
										className="form-control block w-full rounded border border-slate-300 bg-white py-2 px-3 text-sm text-slate-900 focus:border-red-600 focus:outline-none focus:ring-1 focus:ring-red-600 sm:bg-slate-50"
										name="eta"
										onChange={(eta) => setFieldValue('eta', eta)}
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
										htmlFor="tracking"
										className="mb-2 block text-sm font-medium text-slate-900"
									>
										B/L atau AWB
										<span
											className={classNames(
												errors.tracking && touched.tracking ? 'text-red-600' : ''
											)}
										>
											{' '}
											*
										</span>
									</label>
									<Field
										type="tracking"
										id="tracking"
										name="tracking"
										placeholder="Masukkan nomor B/L atau AWB..."
										className={classNames(
											'block w-full rounded border bg-white py-2 px-3 text-sm text-slate-900 focus:border-red-600 focus:outline-none focus:ring-1 focus:ring-red-600 sm:bg-slate-50',
											errors.tracking && touched.tracking
												? 'border-red-600 ring-red-600'
												: 'border-slate-300'
										)}
										autoComplete="off"
										aria-invalid={errors.tracking && touched.tracking ? false : true}
										aria-describedby="trackingNote"
									></Field>
									<ErrorMessage
										id="trackingNote"
										name="tracking"
										component="span"
										className="mt-1 text-xs font-semibold text-red-600"
									/>
								</div>
								<div className="col-span-2">
									<label htmlFor="blDate" className="mb-2 block text-sm font-medium text-slate-900">
										Tanggal
									</label>
									<ReactDatePicker
										selected={values.trackingDate}
										dateFormat="dd/MM/yy"
										className="form-control block w-full rounded border border-slate-300 bg-white py-2 px-3 text-sm text-slate-900 focus:border-red-600 focus:outline-none focus:ring-1 focus:ring-red-600 sm:bg-slate-50"
										name="trackingDate"
										onChange={(trackingDate) => setFieldValue('trackingDate', trackingDate)}
									/>
									<ErrorMessage
										id="trackingDateNote"
										name="trackingDate"
										component="span"
										className="mt-1 text-xs font-semibold text-red-600"
									/>
								</div>
								<div className="col-span-4">
									<label
										htmlFor="invoice"
										className="mb-2 block text-sm font-medium text-slate-900"
									>
										Invoice
										<span
											className={classNames(
												errors.invoice && touched.invoice ? 'text-red-600' : ''
											)}
										>
											{' '}
											*
										</span>
									</label>
									<Field
										type="invoice"
										id="invoice"
										name="invoice"
										placeholder="Masukkan nomor invoice..."
										className={classNames(
											'block w-full rounded border bg-white py-2 px-3 text-sm text-slate-900 focus:border-red-600 focus:outline-none focus:ring-1 focus:ring-red-600 sm:bg-slate-50',
											errors.invoice && touched.invoice
												? 'border-red-600 ring-red-600'
												: 'border-slate-300'
										)}
										autoComplete="off"
										aria-invalid={errors.invoice && touched.invoice ? false : true}
										aria-describedby="invoiceNote"
									></Field>
									<ErrorMessage
										id="invoiceNote"
										name="invoice"
										component="span"
										className="mt-1 text-xs font-semibold text-red-600"
									/>
								</div>
								<div className="col-span-2">
									<label
										htmlFor="invoiceDate"
										className="mb-2 block text-sm font-medium text-slate-900"
									>
										Tanggal Invoice
									</label>
									<ReactDatePicker
										selected={values.invoiceDate}
										dateFormat="dd/MM/yy"
										className="form-control block w-full rounded border border-slate-300 bg-white py-2 px-3 text-sm text-slate-900 focus:border-red-600 focus:outline-none focus:ring-1 focus:ring-red-600 sm:bg-slate-50"
										name="invoiceDate"
										onChange={(invoiceDate) => setFieldValue('invoiceDate', invoiceDate)}
									/>
									<ErrorMessage
										id="invoiceDateNote"
										name="invoiceDate"
										component="span"
										className="mt-1 text-xs font-semibold text-red-600"
									/>
								</div>
								<div className="col-span-6 2md:col-span-4">
									<label htmlFor="price" className="mb-2 block text-sm font-medium text-slate-900">
										Harga Barang
										<span
											className={classNames(errors.price && touched.price ? 'text-red-600' : '')}
										>
											{' '}
											*
										</span>
									</label>
									<Field
										type="price"
										id="price"
										name="price"
										placeholder="Masukkan harga barang..."
										className={classNames(
											'block w-full rounded border bg-white py-2 px-3 text-sm text-slate-900 focus:border-red-600 focus:outline-none focus:ring-1 focus:ring-red-600 sm:bg-slate-50',
											errors.price && touched.price
												? 'border-red-600 ring-red-600'
												: 'border-slate-300'
										)}
										autoComplete="off"
										aria-invalid={errors.price && touched.price ? false : true}
										aria-describedby="priceNote"
									></Field>
									<ErrorMessage
										id="priceNote"
										name="price"
										component="span"
										className="mt-1 text-xs font-semibold text-red-600"
									/>
								</div>
							</div>
						</div>
						<div className="flex justify-end space-x-2 border-t border-slate-200 p-4">
							<button className="inline-flex items-center justify-center rounded border border-slate-200 bg-white py-2 px-4 text-sm font-medium text-slate-900 hover:bg-slate-100 hover:text-red-600 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2">
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
	);
}

export default ShipmentForm;
