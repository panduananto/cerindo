import React, { useState } from 'react';

import { Formik, Field, Form, ErrorMessage } from 'formik';
import { Dialog, Transition } from '@headlessui/react';
import { object, string } from 'yup';

import classNames from '../utils/classNames';
import LoadingSpinner from './LoadingSpinner';

const profileSchema = object().shape({
	firstName: string().required('First name is required'),
	lastName: string().required('Last name is required'),
});

function ProfileForm({ profileFormOpen, setProfileFormOpen }) {
	const [loading, setLoading] = useState(false);

	const handleSubmit = async (values, actions) => {};

	return (
		<Transition appear={true} show={profileFormOpen} as={React.Fragment}>
			<Dialog as="div" onClose={() => setProfileFormOpen(false)} className="relative z-50">
				<Transition.Child
					as={React.Fragment}
					enter="ease-out duration-300"
					enterFrom="opacity-0"
					enterTo="opacity-100"
					leave="ease-in duration-200"
					leaveFrom="opacity-100"
					leaveTo="opacity-0"
				>
					<div className="fixed inset-0 bg-black/30" aria-hidden="true" />
				</Transition.Child>
				<div className="fixed inset-0 overflow-y-auto">
					<div className="fixed inset-0 flex items-center justify-center p-4">
						<Transition.Child
							as={React.Fragment}
							enter="ease-out duration-300"
							enterFrom="opacity-0 scale-95"
							enterTo="opacity-100 scale-100"
							leave="ease-in duration-200"
							leaveFrom="opacity-100 scale-100"
							leaveTo="opacity-0 scale-95"
						>
							<Dialog.Panel className="transform overflow-hidden rounded bg-white shadow-2xl transition-all">
								<Formik
									initialValues={{ email: '', password: '' }}
									validationSchema={profileSchema}
									onSubmit={(values, actions) => handleSubmit(values, actions)}
								>
									{({ errors, touched }) => {
										return (
											<Form>
												<div className="overflow-hidden rounded">
													<div className="bg-white px-6 py-6">
														<Dialog.Title className="font-rubik text-3xl font-bold">
															Who are you?
														</Dialog.Title>
														<Dialog.Description className="text-xl font-light">
															Let us know a little bit about you
														</Dialog.Description>
														<div className="mt-4 grid w-96 grid-cols-6 gap-4 md:w-[28rem]">
															<div className="col-span-6">
																<label className="block text-sm font-medium text-slate-700">
																	Photo
																</label>
																<div className="mt-1 flex items-center space-x-6">
																	<span className="inline-block h-12 w-12 shrink-0 overflow-hidden rounded-full bg-gray-100">
																		<svg
																			className="h-full w-full text-gray-300"
																			fill="currentColor"
																			viewBox="0 0 24 24"
																		>
																			<path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z"></path>
																		</svg>
																	</span>
																	<label className="block">
																		<span className="sr-only">Choose profile photo</span>
																		<input
																			type="file"
																			className="block w-full rounded text-sm text-transparent file:mr-4 file:rounded-full file:border-0 file:bg-red-50 file:py-2 file:px-4 file:text-sm file:font-semibold file:text-red-600 hover:file:bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-4"
																		/>
																	</label>
																</div>
															</div>
															<div className="col-span-3">
																<label
																	htmlFor="firstName"
																	className="mb-2 block text-sm font-medium text-slate-900"
																>
																	First name
																	<span
																		className={classNames(
																			errors.firstName && touched.firstName ? 'text-red-600' : ''
																		)}
																	>
																		{' '}
																		*
																	</span>
																</label>
																<Field
																	type="firstName"
																	id="firstName"
																	name="firstName"
																	placeholder="Enter your first name here..."
																	className={classNames(
																		'block w-full rounded border bg-white p-3 text-sm text-slate-900 focus:border-red-600 focus:outline-none focus:ring-1 focus:ring-red-600 sm:bg-slate-50',
																		errors.firstName && touched.firstName
																			? 'border-red-600 ring-red-600'
																			: 'border-slate-300'
																	)}
																	autoComplete="off"
																	aria-invalid={
																		errors.firstName && touched.firstName ? false : true
																	}
																	aria-describedby="firstNameNote"
																></Field>
																<ErrorMessage
																	id="firstNameNote"
																	name="firstName"
																	component="span"
																	className="mt-1 text-xs font-semibold text-red-600"
																/>
															</div>
															<div className="col-span-3">
																<label
																	htmlFor="lastName"
																	className="mb-2 block text-sm font-medium text-slate-900"
																>
																	Last name
																	<span
																		className={classNames(
																			errors.lastName && touched.lastName ? 'text-red-600' : ''
																		)}
																	>
																		{' '}
																		*
																	</span>
																</label>
																<Field
																	type="lastName"
																	id="lastName"
																	name="lastName"
																	placeholder="Enter your last name here..."
																	className={classNames(
																		'block w-full rounded border bg-white p-3 text-sm text-slate-900 focus:border-red-600 focus:outline-none focus:ring-1 focus:ring-red-600 sm:bg-slate-50',
																		errors.lastName && touched.lastName
																			? 'border-red-600 ring-red-600'
																			: 'border-slate-300'
																	)}
																	autoComplete="off"
																	aria-invalid={errors.lastName && touched.lastName ? false : true}
																	aria-describedby="lastNameNote"
																></Field>
																<ErrorMessage
																	id="lastNameNote"
																	name="lastName"
																	component="span"
																	className="mt-1 text-xs font-semibold text-red-600"
																/>
															</div>
														</div>
													</div>
													<div className="bg-slate-50 px-6 py-4 text-right">
														<button
															type="submit"
															className="inline-flex h-12 max-h-[48px] min-h-[48px] items-center justify-center rounded-full bg-red-600 px-10 font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2"
														>
															{loading ? (
																<React.Fragment>
																	<LoadingSpinner spacing="mr-3" />
																	Saving
																</React.Fragment>
															) : (
																<React.Fragment>Save</React.Fragment>
															)}
														</button>{' '}
													</div>
												</div>
											</Form>
										);
									}}
								</Formik>
							</Dialog.Panel>
						</Transition.Child>
					</div>
				</div>
			</Dialog>
		</Transition>
	);
}

export default ProfileForm;
