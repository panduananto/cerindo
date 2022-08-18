import React from 'react';

function NotFound() {
	return (
		<div className="w-full bg-white">
			<div className="mx-auto flex max-w-6xl flex-col items-center justify-center px-4 py-8 sm:px-6 lg:px-8">
				<div className="py-32 text-center">
					<h1 className="font-rubik text-8xl font-bold">
						4<span className="text-red-600">0</span>4
					</h1>
					<p className="mt-2 font-rubik text-6xl font-bold">Not Found</p>
					<p className="mt-8 text-3xl font-normal">This page doesn't exist yet!</p>
					<p className="mt-2 text-xl font-light">
						Sorry, the page you were looking for could not be found.
					</p>
				</div>
			</div>
		</div>
	);
}

export default NotFound;
