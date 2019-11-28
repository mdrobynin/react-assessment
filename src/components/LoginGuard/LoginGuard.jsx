import React from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

export function LoginGuard({ children }) {
	let authenticated = useSelector(state => state.user.authenticated);

	return authenticated ? children : <Redirect to="/login" />;
}
