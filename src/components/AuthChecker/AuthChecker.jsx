import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { checkLogin } from 'actions';
import { FullScreenLoader } from 'components';

export function AuthCheckerComponent({ children, authStateChecked, checkAuthState }) {
    useEffect(() => {
        checkAuthState()
    }, [ checkAuthState ]);

    return authStateChecked ? ( children ) : <FullScreenLoader/>;
}

const mapStateToProps = state => {
    return {
        authStateChecked: state.user.authStateChecked
    };
}

const mapDispatchToProps = dispatch => {
    return {
        checkAuthState() {
            dispatch(checkLogin());
        }
    };
}

export const AuthChecker = connect(mapStateToProps, mapDispatchToProps)(AuthCheckerComponent);