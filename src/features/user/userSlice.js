import supabase from '../../supabase';

const initialState = {
	status: 'idle',
	session: supabase.auth.session() ?? null,
	profile: {},
	avatar: null,
	error: null,
};

export function login(email, password) {
	return async function loginThunk(dispatch, getState) {
		
	}
}

export default function userReducer(state = initialState, action) {
	switch (action.type) {
		default:
			return state;
	}
}
