import React, { useState } from 'react';

import { IconContext } from 'react-icons/lib';
import { HiEye, HiEyeOff, HiLockClosed, HiMail, HiUser } from 'react-icons/hi';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { object, string } from 'yup';

const registrationSchema = object().shape({
	fullName: string()
		.required('Full name is required')
		.min(3, 'Full name must be at least 3 characters')
		.max(40, 'Full name must be at most 40 characters'),
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
	const [showPassword, setShowPassword] = useState(false);

	return (
		<Formik
			initialValues={{ fullName: '', email: '', password: '' }}
			validationSchema={registrationSchema}
			onSubmit={(values) => {
				console.log(values);
			}}
		>
			<Form autoComplete="false" className="mt-8">
				<IconContext.Provider value={{ className: 'h-5 w-5 text-slate-500' }}>
					<div className="flex w-full flex-col">
						<label htmlFor="fullName" className="mb-2 block text-sm font-medium text-slate-900">
							Full name
						</label>
						<div className="relative">
							<div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
								<HiUser></HiUser>
							</div>
							<Field
								type="text"
								id="fullName"
								name="fullName"
								placeholder="Enter your full name here..."
								className="block w-full rounded border border-slate-300 bg-white p-3 pl-10 text-sm text-slate-900 focus:border-red-600 focus:ring-red-600 sm:bg-slate-50"
							></Field>
						</div>
						<ErrorMessage name="fullName" component="span" className="mt-1 text-xs font-medium text-red-600" />
					</div>
					<div className="mt-4 flex w-full flex-col">
						<label htmlFor="email" className="mb-2 block text-sm font-medium text-slate-900">
							Email
						</label>
						<div className="relative">
							<div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
								<HiMail></HiMail>
							</div>
							<Field
								type="email"
								id="email"
								name="email"
								placeholder="Enter your email here..."
								className="block w-full rounded border border-slate-300 bg-white p-3 pl-10 text-sm text-slate-900 focus:border-red-600 focus:ring-red-600 sm:bg-slate-50"
							></Field>
						</div>
						<ErrorMessage name="email" component="span" className="mt-1 text-xs font-medium text-red-600" />
					</div>
					<div className="mt-4 flex w-full flex-col">
						<label htmlFor="password" className="mb-2 block text-sm font-medium text-slate-900">
							Password
						</label>
						<div className="relative flex">
							<div className="pointer-events-none absolute inset-y-0 left-0 z-20 flex items-center pl-3">
								<HiLockClosed></HiLockClosed>
							</div>
							<Field
								type={showPassword ? 'text' : 'password'}
								id="password"
								name="password"
								placeholder="Enter your password here..."
								className="relative z-10 block w-full min-w-0 flex-1 rounded-none rounded-l border border-slate-300 bg-white p-3 pl-10 text-sm text-slate-900 focus:border focus:border-red-600 focus:ring-1 focus:ring-red-600 sm:bg-slate-50"
							></Field>
							<span
								role="button"
								className="inline-flex items-center rounded-r-md border border-l-0 border-slate-300 bg-slate-200 px-3 text-sm hover:bg-slate-300"
								onClick={() => setShowPassword(!showPassword)}
							>
								{showPassword ? <HiEyeOff></HiEyeOff> : <HiEye></HiEye>}
							</span>
						</div>
						<ErrorMessage name="password" component="span" className="mt-1 text-xs font-medium text-red-600" />
					</div>
				</IconContext.Provider>
				<button
					type="submit"
					className="mt-6 inline-flex h-12 max-h-[48px] min-h-[48px] w-full items-center justify-center rounded-full bg-red-600 font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2"
				>
					Create your account
				</button>
			</Form>
		</Formik>
	);
}

export default RegistrationForm;
