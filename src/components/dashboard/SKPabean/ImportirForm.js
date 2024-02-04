import React from 'react'

import { ErrorMessage, Field, Form, Formik } from 'formik'
import { object, string } from 'yup'

import classNames from '../../../utils/classNames'

const importirSchema = object().shape({
	pic: string().required('Nama PIC harus diisi'),
	title: string().required('Jabatan PIC harus diisi'),
	company: string().required('Nama perusahaan importir harus diisi'),
	npwp: string().required('NPWP perusahaan importir harus diisi').min(15, 'NPWP minimal harus 15 digit'),
	address: string().required('Alamat perusahaan importir harus diisi'),
	phone: string().required('Nomor telepon perusahaan importir harus diisi'),
})

function ImportirForm({ handleSubmitImportir }) {
	return (
		<Formik
			initialValues={{
				pic: '',
				title: '',
				company: '',
				npwp: '',
				address: '',
				phone: '',
			}}
			validationSchema={importirSchema}
			onSubmit={(values, action) => handleSubmitImportir(values, action)}
		>
			{({ errors, touched }) => {
				return (
					<Form>
						<div className="p-6">
							<div className="grid grid-cols-6 gap-x-4 gap-y-6">
								<div className="col-span-3">
									<label htmlFor="pic" className="mb-2 block text-sm font-medium text-slate-900">
										Nama Direksi
										<span className={classNames(errors.pic && touched.pic ? 'text-red-600' : '')}> *</span>
									</label>
									<Field
										type="pic"
										id="pic"
										name="pic"
										placeholder="Masukkan nama direksi perusahaan importir..."
										className={classNames(
											'block w-full rounded border bg-white px-3 py-2 text-sm text-slate-900 focus:border-red-600 focus:outline-none focus:ring-1 focus:ring-red-600 sm:bg-slate-50',
											errors.pic && touched.pic ? 'border-red-600 ring-red-600' : 'border-slate-300',
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
									<label htmlFor="title" className="mb-2 block text-sm font-medium text-slate-900">
										Jabatan Direksi
										<span className={classNames(errors.title && touched.title ? 'text-red-600' : '')}> *</span>
									</label>
									<Field
										type="title"
										id="title"
										name="title"
										placeholder="Masukkan jabatan pic perusahaan importir..."
										className={classNames(
											'block w-full rounded border bg-white px-3 py-2 text-sm text-slate-900 focus:border-red-600 focus:outline-none focus:ring-1 focus:ring-red-600 sm:bg-slate-50',
											errors.title && touched.title ? 'border-red-600 ring-red-600' : 'border-slate-300',
										)}
										autoComplete="off"
										aria-invalid={errors.title && touched.title ? false : true}
										aria-describedby="titleNote"
									></Field>
									<ErrorMessage
										id="titleNote"
										name="title"
										component="span"
										className="mt-1 text-xs font-semibold text-red-600"
									/>
								</div>
								<div className="col-span-6">
									<label htmlFor="company" className="mb-2 block text-sm font-medium text-slate-900">
										Nama Perusahaan
										<span className={classNames(errors.company && touched.company ? 'text-red-600' : '')}> *</span>
									</label>
									<Field
										type="company"
										id="company"
										name="company"
										placeholder="Masukkan nama direksi perusahaan importir..."
										className={classNames(
											'block w-full rounded border bg-white px-3 py-2 text-sm text-slate-900 focus:border-red-600 focus:outline-none focus:ring-1 focus:ring-red-600 sm:bg-slate-50',
											errors.company && touched.company ? 'border-red-600 ring-red-600' : 'border-slate-300',
										)}
										autoComplete="off"
										aria-invalid={errors.company && touched.company ? false : true}
										aria-describedby="companyNote"
									></Field>
									<ErrorMessage
										id="companyNote"
										name="company"
										component="span"
										className="mt-1 text-xs font-semibold text-red-600"
									/>
								</div>
								<div className="col-span-6 2md:col-span-3">
									<label htmlFor="npwp" className="mb-2 block text-sm font-medium text-slate-900">
										NPWP
										<span className={classNames(errors.npwp && touched.npwp ? 'text-red-600' : '')}> *</span>
									</label>
									<Field
										type="npwp"
										id="npwp"
										name="npwp"
										placeholder="Masukkan npwp perusahaan importir..."
										className={classNames(
											'block w-full rounded border bg-white px-3 py-2 text-sm text-slate-900 focus:border-red-600 focus:outline-none focus:ring-1 focus:ring-red-600 sm:bg-slate-50',
											errors.npwp && touched.npwp ? 'border-red-600 ring-red-600' : 'border-slate-300',
										)}
										autoComplete="off"
										aria-invalid={errors.npwp && touched.npwp ? false : true}
										aria-describedby="npwpNote"
									></Field>
									<ErrorMessage
										id="npwpNote"
										name="npwp"
										component="span"
										className="mt-1 text-xs font-semibold text-red-600"
									/>
								</div>
								<div className="col-span-6 2md:col-span-3">
									<label htmlFor="phone" className="mb-2 block text-sm font-medium text-slate-900">
										Nomor Telepon
										<span className={classNames(errors.phone && touched.phone ? 'text-red-600' : '')}> *</span>
									</label>
									<Field
										type="phone"
										id="phone"
										name="phone"
										placeholder="Masukkan phone perusahaan importir..."
										className={classNames(
											'block w-full rounded border bg-white px-3 py-2 text-sm text-slate-900 focus:border-red-600 focus:outline-none focus:ring-1 focus:ring-red-600 sm:bg-slate-50',
											errors.phone && touched.phone ? 'border-red-600 ring-red-600' : 'border-slate-300',
										)}
										autoComplete="off"
										aria-invalid={errors.phone && touched.phone ? false : true}
										aria-describedby="phoneNote"
									></Field>
									<ErrorMessage
										id="phoneNote"
										name="phone"
										component="span"
										className="mt-1 text-xs font-semibold text-red-600"
									/>
								</div>
								<div className="col-span-6">
									<label htmlFor="address" className="mb-2 block text-sm font-medium text-slate-900">
										Alamat
										<span className={classNames(errors.address && touched.address ? 'text-red-600' : '')}> *</span>
									</label>
									<Field
										as="textarea"
										rows="4"
										type="address"
										id="address"
										name="address"
										placeholder="Masukkan alamat perusahaan importir..."
										className={classNames(
											'block w-full rounded border bg-white px-3 py-2 text-sm text-slate-900 focus:border-red-600 focus:outline-none focus:ring-1 focus:ring-red-600 sm:bg-slate-50',
											errors.address && touched.address ? 'border-red-600 ring-red-600' : 'border-slate-300',
										)}
										autoComplete="off"
										aria-invalid={errors.address && touched.address ? false : true}
										aria-describedby="addressNote"
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
							<button className="inline-flex items-center justify-center rounded border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-900 hover:bg-slate-100 hover:text-red-600 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2">
								Reset
							</button>
							<button
								type="submit"
								className="inline-flex items-center justify-center rounded bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2"
							>
								Update
							</button>
						</div>
					</Form>
				)
			}}
		</Formik>
	)
}

export default ImportirForm
