import { connect } from 'react-redux';
import React from 'react';

export function HeaderComponent(props) {
    return (
        <div>
            Header
        </div>
    );
}

const mapStateToProps = state => {
    return {

    };
}

const mapDispatchToProps = dispatch => {
    return {

    };
}

export const Header = connect(mapStateToProps, mapDispatchToProps)(HeaderComponent);