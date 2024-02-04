import { AUTH_ACTION } from '../constants/authConstants'

const login = (session) => {
	return {
		type: AUTH_ACTION.LOGIN,
		payload: session,
	}
}

const logout = () => {
	return {
		type: AUTH_ACTION.LOGOUT,
	}
}

const setProfile = (profile) => {
	return {
		type: AUTH_ACTION.SET_PROFILE,
		payload: profile,
	}
}

export { login, logout, setProfile }
