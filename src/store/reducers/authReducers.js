import { AUTH_ACTION } from '../constants/authConstants';

const initialState = {
	session: {},
};

const AuthReducer = (state = initialState, action) => {
	switch (action.type) {
		case AUTH_ACTION.LOGIN: {
			return {
				...state,
				session: action.payload,
			};
		}
		case AUTH_ACTION.LOGOUT: {
			return {
				...state,
				session: {},
			};
		}
		default: {
			return state;
		}
	}
};

export { initialState, AuthReducer };
