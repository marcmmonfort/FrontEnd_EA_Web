import { Navigate, Route, Routes } from "react-router-dom";
import { AuthService } from "../../services/auth.service";
import React from "react";

const PrivateRoute = ({ component: Component, ...rest }: any) => {
	const isAuthenticated = AuthService.isLoggedIn();
	return isAuthenticated ? (
		<Routes>
			<Route path={rest.path} element={<Component {...rest} />} />
		</Routes>
	) : (
		<Navigate to="/login" />
	);
};

export default PrivateRoute;
