import React from 'react';

import { IconContext } from 'react-icons';
import { HiExclamationCircle, HiCheckCircle, HiOutlineX } from 'react-icons/hi';

import { MESSAGE_TYPE } from '../store/constants/messageConstants';
import { useMessageContext } from '../contexts/MessageContext';
import { clearMessage } from '../store/actions/messageActions';

import classNames from '../utils/classNames';

function Message({ dismissible = false }) {
	const { message, messageDispatch } = useMessageContext();

	return (
		message.type !== MESSAGE_TYPE.NONE && (
			<div
				className={classNames(
					message.type === MESSAGE_TYPE.SUCCESS && 'bg-green-600 text-white',
					message.type === MESSAGE_TYPE.ERROR && 'bg-red-600 text-white',
					'mb-4 -mt-2 rounded p-4 text-sm'
				)}
			>
				<IconContext.Provider value={{ className: 'h-5 w-5' }}>
					<div className="flex items-center justify-between">
						<div className="flex items-start space-x-2 font-semibold">
							<span className="shrink-0">
								{message.type === MESSAGE_TYPE.SUCCESS && <HiCheckCircle />}
								{message.type === MESSAGE_TYPE.ERROR && <HiExclamationCircle />}
							</span>
							<p>{message.text}</p>
						</div>
						{dismissible && (
							<button
								className={classNames(
									message.type === MESSAGE_TYPE.SUCCESS && 'hover:bg-green-700 focus:bg-green-700',
									message.type === MESSAGE_TYPE.ERROR && 'hover:bg-red-700 focus:bg-red-700',
									'-mx-1.5 -my-1.5 inline-flex h-8 w-8 rounded p-1.5 transition-colors duration-150 ease-in-out focus:outline-none focus:ring-0'
								)}
								onClick={() => messageDispatch(clearMessage())}
							>
								<HiOutlineX />
							</button>
						)}
					</div>
				</IconContext.Provider>
				{message.detailText && (
					<p className={classNames(dismissible ? 'mt-3' : 'mt-2', 'font-light')}>{message.detailText}</p>
				)}
			</div>
		)
	);
}

export default Message;
