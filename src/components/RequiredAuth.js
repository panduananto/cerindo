import React from 'react';

import { useLocation, Navigate, Outlet } from 'react-router-dom';

import { useAuthContext } from '../contexts/AuthContext';

function RequiredAuth() {
	const { auth } = useAuthContext();
	const location = useLocation();

	return auth?.session ? <Outlet /> : <Navigate to="/login" state={{ from: location }} replace />;
}

export default RequiredAuth;
