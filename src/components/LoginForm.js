import React, { useState } from 'react';

import { Link } from 'react-router-dom';
import { IconContext } from 'react-icons/lib';
import { HiMail, HiLockClosed, HiEye, HiEyeOff } from 'react-icons/hi';
import { Formik, Field, Form } from 'formik';

function LoginForm() {
	const [showPassword, setShowPassword] = useState(false);

	return (
		<Formik initialValues={{ email: '', password: '' }}>
			<Form className="mt-8">
				<IconContext.Provider value={{ className: 'h-5 w-5 text-slate-500' }}>
					<div className="flex w-full flex-col">
						<label htmlFor="username" className="mb-2 block text-sm font-medium text-slate-900">
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
					</div>
				</IconContext.Provider>
				<Link
					role="button"
					to="/dashboard"
					type="submit"
					className="mt-6 inline-flex h-12 max-h-[48px] min-h-[48px] w-full items-center justify-center rounded-full bg-red-600 font-medium text-white hover:bg-red-700"
				>
					Log in
				</Link>
			</Form>
		</Formik>
	);
}

export default LoginForm;
