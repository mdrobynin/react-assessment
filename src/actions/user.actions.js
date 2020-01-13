import {
    performLogin,
    fetchUserData,
    performLogout,
    checkAuthStatus
} from '../requests';
import {
    CHECKOUT_ACTIONS
} from './checkout.actions';

export const USER_ACTIONS = {
    LOGIN_LOGOUT_PROCESS: '@@USER_ACTIONS/LOGIN_LOGOUT_PROCESS',
    AUTH_STATE_CHECK: '@@USER_ACTIONS/AUTH_STATE_CHECK',
    LOGIN_ERROR: '@@USER_ACTIONS/LOGIN_ERROR',
    LOGIN_SUCCESS: '@@USER_ACTIONS/LOGIN_SUCCESS',
    LOGOUT_ERROR: '@@USER_ACTIONS/LOGOUT_ERROR',
    LOGOUT_SUCCESS: '@@USER_ACTIONS/LOGOUT_SUCCESS',
}

function fetchUser(dispatch) {
    fetchUserData().then(userData => {
        dispatch({
            type: USER_ACTIONS.LOGIN_SUCCESS,
            payload: userData
        });
        dispatch({ type: USER_ACTIONS.LOGIN_LOGOUT_PROCESS, payload: false });
        dispatch({ type: USER_ACTIONS.AUTH_STATE_CHECK });
    });
}

export function login(login, password) {
    return dispatch => {
        dispatch({ type: USER_ACTIONS.LOGIN_LOGOUT_PROCESS, payload: true });

        return performLogin(login, password)
            .then(result => {
                if (result) {
                    fetchUser(dispatch);
                } else {
                    dispatch({ type: USER_ACTIONS.LOGIN_ERROR });
                    dispatch({ type: USER_ACTIONS.LOGIN_LOGOUT_PROCESS, payload: false });
                }
            });
    };
}

export function logout() {
    return dispatch => {
        dispatch({ type: USER_ACTIONS.LOGIN_LOGOUT_PROCESS, payload: true });

        return performLogout()
            .then(result => {
                dispatch({ type: result ? USER_ACTIONS.LOGOUT_SUCCESS : USER_ACTIONS.LOGOUT_ERROR });
                dispatch({ type: USER_ACTIONS.LOGIN_LOGOUT_PROCESS, payload: false });
                dispatch({ type: CHECKOUT_ACTIONS.CLEAR_BASKET });
            });
    };
}

export function checkLogin() {
    return dispatch => {
        return checkAuthStatus().then(result => {
            if (result) {
                fetchUser(dispatch);
            } else {
                dispatch({ type: USER_ACTIONS.LOGOUT_SUCCESS });
                dispatch({ type: USER_ACTIONS.AUTH_STATE_CHECK });
            }
        });
    }
}
