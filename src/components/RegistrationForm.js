import React, { useState } from 'react';

import { IconContext } from 'react-icons/lib';
import { HiEye, HiEyeOff, HiLockClosed, HiMail } from 'react-icons/hi';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { object, string } from 'yup';

import { useMessageContext } from '../contexts/MessageContext';
import { showSuccessMessage, showErrorMessage } from '../store/actions/messageActions';

import LoadingSpinner from './LoadingSpinner';
import Message from './Message';

import supabase from '../supabase';
import classNames from '../utils/classNames';

const registrationSchema = object().shape({
	email: string().email('Please provide a valid email address').required('Email is required'),
	password: string()
		.required('Password is required')
		.min(6, 'Password must be at least 6 characters')
		.max(100, 'Password must be at most 100 characters')
		.matches(/[a-z]+/, 'Password must contain one lowercase character')
		.matches(/[A-Z]+/, 'Password must contain one uppercase character')
		.matches(/[@$!%*#?&]+/, 'Password must contain one special character')
		.matches(/\d+/, 'Password must contain one number'),
});

function RegistrationForm() {
	const { messageDispatch } = useMessageContext();

	const [loading, setLoading] = useState(false);
	const [showPassword, setShowPassword] = useState(false);

	const handleSubmit = async (values, actions) => {
		try {
			setLoading(true);

			const { error } = await supabase.auth.signUp({
				email: values.email,
				password: values.password,
			});

			if (error) throw error;

			messageDispatch(
				showSuccessMessage(
					'You have successfully registered',
					'Please check your email to activate your account by clicking the link we send'
				)
			);
		} catch (error) {
			messageDispatch(showErrorMessage(error));
		} finally {
			setLoading(false);

			actions.resetForm({
				values: {
					email: '',
					password: '',
				},
			});
		}
	};

	return (
		<div>
			<Formik
				initialValues={{ email: '', password: '' }}
				validationSchema={registrationSchema}
				onSubmit={(values, actions) => handleSubmit(values, actions)}
			>
				{({ errors, touched }) => {
					return (
						<Form className="mt-8">
							<Message></Message>
							<IconContext.Provider value={{ className: 'h-5 w-5 text-slate-500' }}>
								<div className="flex w-full flex-col">
									<label htmlFor="email" className="mb-2 block text-sm font-medium text-slate-900">
										Email
										<span
											className={classNames(errors.email && touched.email ? 'text-red-600' : '')}
										>
											{' '}
											*
										</span>
									</label>
									<div className="relative">
										<div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
											<HiMail />
										</div>
										<Field
											type="email"
											id="email"
											name="email"
											placeholder="Enter your email here..."
											className={classNames(
												'block w-full rounded border bg-white p-3 pl-10 text-sm text-slate-900 focus:border-red-600 focus:ring-red-600 sm:bg-slate-50',
												errors.email && touched.email
													? 'border-red-600 ring-red-600'
													: 'border-slate-300'
											)}
											autoComplete="off"
											aria-invalid={errors.email && touched.email ? false : true}
											aria-describedby="emailNote"
										></Field>
									</div>
									<ErrorMessage
										id="emailNote"
										name="email"
										component="span"
										className="mt-1 text-xs font-semibold text-red-600"
									/>
								</div>
								<div className="mt-4 flex w-full flex-col">
									<label
										htmlFor="password"
										className="mb-2 block text-sm font-medium text-slate-900"
									>
										Password
										<span
											className={classNames(
												errors.password && touched.password ? 'text-red-600' : ''
											)}
										>
											{' '}
											*
										</span>
									</label>
									<div className="relative flex">
										<div className="pointer-events-none absolute inset-y-0 left-0 z-20 flex items-center pl-3">
											<HiLockClosed />
										</div>
										<Field
											type={showPassword ? 'text' : 'password'}
											id="password"
											name="password"
											placeholder="Enter your password here..."
											className={classNames(
												'relative z-10 block w-full min-w-0 flex-1 rounded-none rounded-l border border-slate-300 bg-white p-3 pl-10 text-sm text-slate-900 focus:border focus:border-red-600 focus:ring-1 focus:ring-red-600 sm:bg-slate-50',
												errors.password && touched.password
													? 'border-red-600 ring-red-600'
													: 'border-slate-300'
											)}
											autoComplete="off"
											aria-invalid={errors.password && touched.password ? false : true}
											aria-describedby="passwordNote"
										></Field>
										<span
											role="button"
											className="inline-flex items-center rounded-r-md border border-l-0 border-slate-300 bg-slate-200 px-3 text-sm hover:bg-slate-300"
											onClick={() => setShowPassword(!showPassword)}
										>
											{showPassword ? <HiEyeOff /> : <HiEye />}
										</span>
									</div>
									<ErrorMessage
										id="passwordNote"
										name="password"
										component="span"
										className="mt-1 text-xs font-semibold text-red-600"
									/>
								</div>
							</IconContext.Provider>
							<button
								type="submit"
								className="mt-6 inline-flex h-12 max-h-[48px] min-h-[48px] w-full items-center justify-center rounded-full bg-red-600 font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2"
							>
								{loading ? (
									<React.Fragment>
										<LoadingSpinner spacing="mr-3" />
										Registering your account...
									</React.Fragment>
								) : (
									<React.Fragment>Create your account</React.Fragment>
								)}
							</button>
						</Form>
					);
				}}
			</Formik>
		</div>
	);
}

export default RegistrationForm;
