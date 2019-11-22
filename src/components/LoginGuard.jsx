import { connect } from 'react-redux';
import React from 'react';

export function LoginGuardComponent(props) {
    return (
        <div>
            {props.authenticated ? 'authenticated' : 'aye'}
        </div>
    );
}

const mapStateToProps = state => {
    return {
        authenticated: state.user.authenticated
    };
}

export const LoginGuard = connect(mapStateToProps)(LoginGuardComponent);