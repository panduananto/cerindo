import { AUTH_ACTION } from '../constants/authConstants';

import supabase from '../../supabase';

const initialState = {
	session: supabase.auth.session() ?? null,
	profile: {},
};

const AuthReducer = (state = initialState, action) => {
	switch (action.type) {
		case AUTH_ACTION.LOGIN: {
			return {
				...state,
				session: action.payload,
			};
		}
		case AUTH_ACTION.SET_PROFILE: {
			return {
				...state,
				profile: action.payload,
			};
		}
		case AUTH_ACTION.LOGOUT: {
			return {
				...state,
				session: {},
				profile: {},
			};
		}
		default: {
			return state;
		}
	}
};

export { initialState, AuthReducer };
