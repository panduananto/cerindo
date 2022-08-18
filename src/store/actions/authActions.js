import { AUTH_ACTION } from '../constants/authConstants';

const login = (session) => {
	return {
		type: AUTH_ACTION.LOGIN,
		payload: session,
	};
};

const logout = () => {
	return {
		type: AUTH_ACTION.LOGOUT,
	};
};

export { login, logout };
