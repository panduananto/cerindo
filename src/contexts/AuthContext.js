import React, { createContext, useReducer, useContext, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { login, logout } from '../store/actions/authActions';
import { initialState, AuthReducer } from '../store/reducers/authReducers';

import supabase from '../supabase';

const AuthContext = createContext();
AuthContext.displayName = 'AuthContext';

const AuthProvider = ({ children }) => {
	const [auth, authDispatch] = useReducer(AuthReducer, initialState);
	const authData = { auth, authDispatch };

	const navigate = useNavigate();
	const location = useLocation();
	const from = location.state?.from?.pathname || '/dashboard';

	useEffect(() => {
		authDispatch(login(supabase.auth.session()));

		const { data: listener } = supabase.auth.onAuthStateChange((event, session) => {
			if (event === 'SIGNED_IN') {
				authDispatch(login(session));
				navigate(from, { replace: true });
			} else if (event === 'SIGNED_OUT') {
				authDispatch(logout());
				navigate('/login', { replace: true });
			} else {
				return;
			}
		});

		return () => {
			listener?.unsubscribe();
		};
	}, [navigate, from]);

	return <AuthContext.Provider value={authData}>{children}</AuthContext.Provider>;
};

const useAuthContext = () => {
	return useContext(AuthContext);
};

export { AuthContext, AuthProvider, useAuthContext };
