import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { InputWithValidation, CustomButton } from 'components';
import { login } from 'actions';
import './LoginPage.scss';

function LoginPageComponent({ authenticated, performLogin }) {
    let [ login, setLogin ] = useState('');
    let [ password, setPassword ] = useState('');

    const handleLoginChange = (event) => {
        setLogin(event.target.value);
    }

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    }

    const handleLogin = () => {
        if (login && password) {
            performLogin(login, password);
        }
    }

    return (
        authenticated
        ? <Redirect to="/" />
        : <div className="login-page">
            <div className="login-page__content">
                <div className="login-page__header">
                    <img src="/logo192.png" alt="Logo" className="login-page__header-logo"/>
                    <h1 className="login-page__header-title">
                        Login
                    </h1>
                </div>
                <div className="login-page__form">
                    <div className="login-page__form-title">
                        Login
                    </div>
                    <div className="login-page__form-error">
                    
                    </div>
                    <div className="login-page__form-field">
                        <InputWithValidation value={login} onChange={handleLoginChange}/>
                    </div>
                    <div className="login-page__form-field">
                        <InputWithValidation type="password" value={password} onChange={handlePasswordChange}/>
                    </div>
                    <div className="login-page__actions">
                        <CustomButton onClick={handleLogin} theme="light">login</CustomButton>
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

const mapDispatchToProps = dispatch => {
    return {
        performLogin(username, password) {
            dispatch(login(username, password));
        }
    };
};

export const LoginPage = connect(mapStateToProps, mapDispatchToProps)(LoginPageComponent);