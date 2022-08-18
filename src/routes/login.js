import React from 'react';

import { Link } from 'react-router-dom';
import { HiOutlineArrowLeft } from 'react-icons/hi';

import { MessageProvider } from '../contexts/MessageContext';

import Logo from '../components/Logo';
import LoginForm from '../components/LoginForm';

function login() {
	return (
		<MessageProvider>
			<div className="flex h-full w-full flex-auto flex-col text-slate-900">
				<div className="flex min-w-0 flex-auto flex-col items-center bg-slate-50 sm:flex-row sm:justify-center sm:bg-slate-100 sm:bg-none md:items-start md:justify-start">
					<div className="w-full py-8 px-4 sm:w-auto sm:rounded-2xl sm:border sm:border-slate-300 sm:bg-white sm:p-12 sm:shadow md:flex md:h-full md:w-1/2 md:items-center md:justify-end md:rounded-none md:shadow-none lg:p-16">
						<div className="mx-auto w-full max-w-[20rem] sm:mx-0 sm:w-80">
							<div className="inline-flex flex-col items-start">
								<Link to="/" className="mb-4 inline-flex items-center text-sm hover:underline hover:underline-offset-4">
									<HiOutlineArrowLeft className="mr-2 h-5 w-5 text-slate-900"></HiOutlineArrowLeft>
									Go back to homepage
								</Link>
								<Logo></Logo>
							</div>
							<h1 className="mt-8 font-rubik text-4xl font-bold leading-tight tracking-tight">Log In</h1>
							<div className="mt-0.5 flex items-baseline font-medium">
								<p>Don't have an account?</p>
								<Link to="/registration" className="ml-1 text-red-600 hover:text-red-700">
									Sign up
								</Link>
							</div>
							<LoginForm></LoginForm>
						</div>
					</div>
					<div className="relative hidden h-full w-1/2 flex-auto items-center justify-center overflow-hidden bg-[url('../public/images/login_bg.jpg')] bg-cover bg-center bg-no-repeat p-16 dark:border-l md:flex lg:px-28"></div>
				</div>
			</div>
		</MessageProvider>
	);
}

export default login;
