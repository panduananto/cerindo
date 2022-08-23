import React, { createContext, useReducer, useContext, useEffect, useCallback } from 'react';

import { login, logout, setProfile } from '../store/actions/authActions';
import { initialState, AuthReducer } from '../store/reducers/authReducers';

import supabase from '../supabase';

const AuthContext = createContext();
AuthContext.displayName = 'AuthContext';

const AuthProvider = ({ children }) => {
	const [auth, authDispatch] = useReducer(AuthReducer, initialState);

	const handleSignIn = async (email, password) => {
		const { data, error, status } = await supabase.auth.signIn({
			email: email,
			password: password,
		});

		return { data, error, status };
	};

	const handleSignOut = async () => {
		await supabase.auth.signOut();
	};

	const handleCreateProfile = async (profile) => {
		return await supabase.from('profiles').insert([profile]);
	};

	const handleUploadAvatar = async (avatar) => {
		return await supabase.storage.from('avatars').upload(avatar.filePath, avatar.file);
	};

	const handleDownloadAvatar = async (url) => {
		return await supabase.storage.from('avatars').download(url);
	};

	const handleReadProfile = async (id) => {
		return await supabase.from('profiles').select('first_name, avatar_url').eq('id', id).single();
	};

	const getUserProfile = useCallback(async (session) => {
		if (session) {
			const { data: profile, error: profileError } = await handleReadProfile(session.user.id);

			if (profileError) return null;

			const { data: downloadedAvatar, error: avatarError } = await handleDownloadAvatar(
				profile.avatar_url
			);

			if (avatarError) return null;

			const avatar_image = URL.createObjectURL(downloadedAvatar);

			authDispatch(setProfile({ ...profile, avatar_image }));
		}
	}, []);

	useEffect(() => {
		const session = supabase.auth.session();

		authDispatch(login(session ?? null));
		getUserProfile(session);

		const { data: listener } = supabase.auth.onAuthStateChange((event, session) => {
			if (event === 'SIGNED_IN') {
				authDispatch(login(session ?? null));
				getUserProfile(session);
			} else if (event === 'SIGNED_OUT') {
				authDispatch(logout());
			} else {
				return;
			}
		});

		return () => {
			listener?.unsubscribe();
		};
	}, [getUserProfile]);

	const value = {
		auth: auth,
		authDispatch: authDispatch,
		signIn: handleSignIn,
		signOut: handleSignOut,
		createProfile: handleCreateProfile,
		readProfile: handleReadProfile,
		uploadAvatar: handleUploadAvatar,
		downloadAvatar: handleDownloadAvatar,
	};

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

const useAuthContext = () => {
	return useContext(AuthContext);
};

export { AuthContext, AuthProvider, useAuthContext };
