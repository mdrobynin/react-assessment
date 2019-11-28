import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { checkLogin } from 'actions';
import { FullScreenLoader } from 'components';

export function AuthChecker({ children }) {
    let authStateChecked = useSelector(state => state.user.authStateChecked);
    let dispatch = useDispatch();

    useEffect(() => {
        dispatch(checkLogin());
    });

    return authStateChecked ? ( children ) : <FullScreenLoader/>;
}
