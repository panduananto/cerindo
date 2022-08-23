import React, { useState } from 'react';

import { Formik, Field, Form, ErrorMessage } from 'formik';
import { Dialog, Transition } from '@headlessui/react';
import { object, string } from 'yup';

import LoadingSpinner from './LoadingSpinner';

import { useAuthContext } from '../contexts/AuthContext';
import { setProfile } from '../store/actions/authActions';

import classNames from '../utils/classNames';
import readImageAsDataURL from '../utils/readImageAsDataUrl';

const profileSchema = object().shape({
	firstName: string().required('First name is required'),
	lastName: string().required('Last name is required'),
});

function ProfileForm({ user, setProfileFormOpen }) {
	const { authDispatch, createProfile, readProfile, uploadAvatar, downloadAvatar } =
		useAuthContext();

	const [loading, setLoading] = useState(false);
	const [previewAvatar, setPreviewAvatar] = useState(null);

	const handleChangeAvatar = (event) => {
		const file = event.target.files[0];
		const fileExt = file.name.split('.').pop();
		const fileName = `${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
		const filePath = `${fileName}`;

		readImageAsDataURL(file, setPreviewAvatar);

		return { filePath, file };
	};

	const handleSubmit = async (values, actions) => {
		const { firstName, lastName, avatar } = values;

		try {
			setLoading(true);

			const new_profile = {
				id: user.id,
				email: user.email,
				first_name: firstName,
				last_name: lastName,
				avatar_url: avatar.filePath,
			};

			const { error: createProfileError } = await createProfile(new_profile);
			const { error: uploadAvatarError } = await uploadAvatar(avatar);

			if (createProfileError || uploadAvatarError)
				throw createProfileError ? createProfileError : uploadAvatarError;

			const { data: profile, error: profileError } = await readProfile(user.id);

			if (profileError) throw profileError;

			const { data: downloadedAvatar, error: avatarError } = await downloadAvatar(
				profile.avatar_url
			);

			if (avatarError) throw avatarError;

			authDispatch(setProfile({ ...profile, downloadedAvatar }));

			// TODO: show success message to users
		} catch (error) {
			console.log(error); // TODO: show error message to users
		} finally {
			setLoading(false);

			actions.resetForm({
				values: {
					firstName: '',
					lastName: '',
					avatar: {},
				},
			});

			setProfileFormOpen(false);
		}
	};

	return (
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
								initialValues={{ firstName: '', lastName: '', avatar: {} }}
								validationSchema={profileSchema}
								onSubmit={(values, actions) => handleSubmit(values, actions)}
							>
								{({ errors, touched, setFieldValue }) => {
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
																<span className="flex h-12 w-12 shrink-0 items-center overflow-hidden rounded-full bg-gray-100">
																	{previewAvatar ? (
																		<img src={previewAvatar} alt="User avatar"></img>
																	) : (
																		<svg
																			className="h-full w-full text-gray-300"
																			fill="currentColor"
																			viewBox="0 0 24 24"
																		>
																			<path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z"></path>
																		</svg>
																	)}
																</span>
																<label className="block">
																	<span className="sr-only">Choose profile photo</span>
																	<input
																		type="file"
																		id="avatar"
																		name="avatar"
																		accept="image/*"
																		className="block w-full rounded text-sm text-transparent file:mr-4 file:rounded-full file:border-0 file:bg-red-50 file:py-2 file:px-4 file:text-sm file:font-semibold file:text-red-600 hover:file:bg-red-100 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-4"
																		onChange={(event) =>
																			setFieldValue('avatar', handleChangeAvatar(event))
																		}
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
																aria-invalid={errors.firstName && touched.firstName ? false : true}
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
												<div className="flex flex-row items-center justify-end space-x-4 bg-slate-50 px-6 py-4">
													<button
														type="button"
														className="font-medium hover:text-red-600"
														onClick={() => setProfileFormOpen(false)}
													>
														Skip
													</button>
													<button
														type="submit"
														className="inline-flex h-12 max-h-[48px] min-h-[48px] items-center justify-center rounded-full bg-red-600 px-10 font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2"
													>
														{loading ? (
															<React.Fragment>
																<LoadingSpinner spacing="mr-3" />
																Saving...
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
	);
}

export default ProfileForm;
