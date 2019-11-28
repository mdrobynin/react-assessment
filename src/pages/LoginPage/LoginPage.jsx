import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { InputWithValidation, CustomButton } from 'components';
import { login as performLogin } from 'actions';
import './LoginPage.scss';

export function LoginPage() {
    let [ login, setLogin ] = useState('');
    let [ password, setPassword ] = useState('');
    let authenticated = useSelector(state => state.user.authenticated);
    let dispatch = useDispatch();

    const handleInputValueChange = setter => event => {
        setter(event.target.value);
    }

    const handleLogin = () => {
        if (login && password) {
            dispatch(performLogin(login, password));
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
                        <InputWithValidation value={login} onChange={handleInputValueChange(setLogin)}/>
                    </div>
                    <div className="login-page__form-field">
                        <InputWithValidation type="password" value={password} onChange={handleInputValueChange(setPassword)}/>
                    </div>
                    <div className="login-page__actions">
                        <CustomButton onClick={handleLogin} theme="light">login</CustomButton>
                    </div>
                </div>
            </div>
        </div>
    );
}
