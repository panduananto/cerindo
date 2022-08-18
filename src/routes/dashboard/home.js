import React, { useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';

function HomeDashboard() {
	let [isOpen, setIsOpen] = useState(true);

	return (
		<div className="h-[calc(100vh-65px)] w-full overflow-y-auto bg-slate-50">
			<Transition
				as={React.Fragment}
				show={isOpen}
				enter="transition duration-100 ease-out"
				enterFrom="transform scale-95 opacity-0"
				enterTo="transform scale-100 opacity-100"
				leave="transition duration-75 ease-out"
				leaveFrom="transform scale-100 opacity-100"
				leaveTo="transform scale-95 opacity-0"
			>
				<Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
					<div className="fixed inset-0 bg-black/30" aria-hidden="true" />
					<div className="fixed inset-0 flex items-center justify-center p-4">
						<Dialog.Panel>
							<Dialog.Title>Deactivate account</Dialog.Title>
							<Dialog.Description>This will permanently deactivate your account</Dialog.Description>

							<p>
								Are you sure you want to deactivate your account? All of your data will be permanently removed. This
								action cannot be undone.
							</p>

							<button onClick={() => setIsOpen(false)}>Deactivate</button>
							<button onClick={() => setIsOpen(false)}>Cancel</button>
						</Dialog.Panel>
					</div>
				</Dialog>
			</Transition>
		</div>
	);
}

export default HomeDashboard;
