import React from 'react';
import { connect } from 'react-redux';
import { CustomButton } from 'components';
import { logout } from 'actions';
import './Header.scss';

export function HeaderComponent({ userData, preformLogout }) {
    const handleLogout = () => preformLogout();

    return (
        <div className="header">
            <div className="header__title">
                React assessment | Online shop
            </div>
            <div className="header__spacer"></div>
            <div className="header__logout">
                <CustomButton onClick={handleLogout}>logout {userData.login}</CustomButton>
            </div>
        </div>
    );
}

const mapStateToProps = state => {
    return {
        userData: state.user.userData
    };
}

const mapDispatchToProps = dispatch => {
    return {
        preformLogout() {
            dispatch(logout());
        }
    };
}

export const Header = connect(mapStateToProps, mapDispatchToProps)(HeaderComponent);