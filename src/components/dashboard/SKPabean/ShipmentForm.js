import React from 'react';

import ReactDatePicker from 'react-datepicker';
import { RadioGroup } from '@headlessui/react';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { HiCheckCircle } from 'react-icons/hi';
import { object, string, boolean, date } from 'yup';

import classNames from '../../../utils/classNames';

import 'react-datepicker/dist/react-datepicker.css';

const shipmentSchema = object().shape({
	type: boolean().required('Jenis shipment harus dipilih').oneOf([0, 1]),
	goods: string().required('Nama barang harus diisi').max(30, 'Nama barang maksimal 30 karakter'),
	container: string().nullable().notRequired(),
	vessel: string().required('Nama vessel harus diisi'),
	eta: date().required('ETA harus disebutkan'),
	bl: string().required('Nomor B/L harus diisi'),
	blDate: date().required('Tanggal B/L harus disebutkan'),
});

function ShipmentForm({ handleSubmitShipment }) {
	return (
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
										name="note"
										component="span"
										className="mt-1 text-xs font-semibold text-red-600"
									/>
								</div>
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
									<label htmlFor="goods" className="mb-2 block text-sm font-medium text-slate-900">
										B/L
										<span className={classNames(errors.bl && touched.bl ? 'text-red-600' : '')}>
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
											errors.bl && touched.bl ? 'border-red-600 ring-red-600' : 'border-slate-300'
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
	);
}

export default ShipmentForm;
