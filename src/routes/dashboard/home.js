import React from 'react';

import { useOutletContext } from 'react-router-dom';

function HomeDashboard() {
	const [profile] = useOutletContext();

	return (
		<div className="h-[calc(100vh-65px)] w-full overflow-y-auto bg-slate-50 px-8 py-8 text-slate-900 sm:px-10 lg:px-12">
			<div className="flex items-center">
				{profile?.avatar_image ? (
					<img src={profile?.avatar_image} className="h-16 w-16 rounded-full" alt="User profile" />
				) : (
					<span>
						<svg
							className="h-16 w-16 rounded-full text-gray-300"
							fill="currentColor"
							viewBox="0 0 24 24"
						>
							<path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z"></path>
						</svg>
					</span>
				)}
				<p className="ml-4 font-rubik text-3xl font-semibold leading-8">
					Welcome back, {profile?.first_name}
				</p>
			</div>
		</div>
	);
}

export default HomeDashboard;
