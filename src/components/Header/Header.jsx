import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { CustomButton } from 'components';
import { logout } from 'actions';
import './Header.scss';

export function Header() {
    let dispatch = useDispatch();
    let userData = useSelector(state => state.user.userData);
    const handleLogout = () => dispatch(logout());

    return (
        <div className="header">
            <div className="header__title">
                React assessment | Online shop
            </div>
            <div className="header__spacer"></div>
            <div className="header__logout">
                <Link to='/checkout'>
                    <CustomButton theme="light">checkout</CustomButton>
                </Link>
            </div>
            <div className="header__logout">
                <CustomButton onClick={handleLogout} theme="light">logout {userData.login}</CustomButton>
            </div>
        </div>
    );
}
