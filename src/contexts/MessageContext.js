import React, { createContext, useReducer, useContext } from 'react';

import { initialState, MessageReducer } from '../store/reducers/messageReducers';

const MessageContext = createContext();
MessageContext.displayName = 'MessageContext';

const MessageProvider = ({ children }) => {
	const [message, messageDispatch] = useReducer(MessageReducer, initialState);
	const messageData = { message, messageDispatch };

	return <MessageContext.Provider value={messageData}>{children}</MessageContext.Provider>;
};

const useMessageContext = () => {
	return useContext(MessageContext);
};

export { MessageContext, MessageProvider, useMessageContext };
