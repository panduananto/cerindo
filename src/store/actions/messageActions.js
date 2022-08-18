import { MESSAGE_ACTION, MESSAGE_TYPE } from '../constants/messageConstants';

const showSuccessMessage = (text, detailText) => {
	return {
		type: MESSAGE_ACTION.SHOW_MESSAGE,
		payload: { type: MESSAGE_TYPE.SUCCESS, text: text, detailText: detailText },
	};
};

const showErrorMessage = (error) => {
	let text,
		detailText = '';

	if (error.message === 'Request Failed' || error instanceof TypeError) {
		text = 'Something went wrong';
		detailText = 'There was an issue trying to submit. Please try again';
	} else {
		text = error.message;
	}

	return {
		type: MESSAGE_ACTION.SHOW_MESSAGE,
		payload: { type: MESSAGE_TYPE.ERROR, text: text, detailText: detailText },
	};
};

const clearMessage = () => {
	return {
		type: MESSAGE_ACTION.CLEAR_MESSAGE,
		payload: { type: MESSAGE_TYPE.NONE },
	};
};

export { showSuccessMessage, showErrorMessage, clearMessage };
