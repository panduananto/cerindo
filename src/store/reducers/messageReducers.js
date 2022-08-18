import { MESSAGE_ACTION, MESSAGE_TYPE } from '../constants/messageConstants';

const initialState = {
	type: MESSAGE_TYPE.NONE,
	text: '',
	detailText: '',
};

const MessageReducer = (state = initialState, action) => {
	switch (action.type) {
		case MESSAGE_ACTION.SHOW_MESSAGE: {
			const { type, text, detailText } = action.payload;

			return {
				...state,
				type: type,
				text: text,
				detailText: detailText,
			};
		}
		case MESSAGE_ACTION.CLEAR_MESSAGE: {
			return {
				...state,
				type: MESSAGE_TYPE.NONE,
				text: '',
				detailText: '',
			};
		}
		default: {
			return state;
		}
	}
};

export { initialState, MessageReducer };
