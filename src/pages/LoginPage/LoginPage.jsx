import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { InputWithValidation } from 'components';

function LoginPageComponent({ authenticated }) {
    return (
        authenticated
        ? <Redirect to="/" />
        : <div className="login-page">
            <div className="login-page__content">
                <div className="login-page__header">
                    <div className="login-page__header-logo">
                        Logo
                    </div>
                    <h1 className="login-page__header-title">
                        Login
                    </h1>
                </div>
                <div className="login-page__form">
                    <div className="login-page__form-title">
                    
                    </div>
                    <div className="login-page__form-error">
                    
                    </div>
                    <div className="login-page__form-field">
                        <InputWithValidation />
                    </div>
                    <div className="login-page__form-field">
                        <InputWithValidation type="password"/>
                    </div>
                </div>
            </div>
        </div>
    );
}

const mapStateToProps = state => {
    return {
        authenticated: state.user.authenticated
    };
};

export const LoginPage = connect(mapStateToProps)(LoginPageComponent);