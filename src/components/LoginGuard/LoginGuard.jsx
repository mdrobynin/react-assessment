import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

function LoginGuardComponent({ children, authenticated }) {
	return authenticated ? children : <Redirect to="/login" />;
}

const mapStateToProps = state => {
	return {
		authenticated: state.user.authenticated
	};
};

export const LoginGuard = connect(mapStateToProps)(LoginGuardComponent);
