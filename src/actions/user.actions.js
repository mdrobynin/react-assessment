import {
    performLogin,
    fetchUserData,
    performLogout
} from '../requests';

export const USER_ACTIONS = {
    LOGIN_LOGOUT_PROCESS: '@@USER_ACTIONS/LOGIN_LOGOUT_PROCESS',
    LOGIN_ERROR: '@@USER_ACTIONS/LOGIN_ERROR',
    LOGIN_SUCCESS: '@@USER_ACTIONS/LOGIN_SUCCESS',
    LOGOUT_ERROR: '@@USER_ACTIONS/LOGOUT_ERROR',
    LOGOUT_SUCCESS: '@@USER_ACTIONS/LOGOUT_SUCCESS',
}

export function login(login, password) {
    return (dispatch) => {
        dispatch({ type: USER_ACTIONS.LOGIN_LOGOUT_PROCESS, payload: true });

        performLogin(login, password)
            .then(result => {
                if (result) {
                    fetchUserData().then(userData => {
                        dispatch({
                            type: USER_ACTIONS.LOGIN_SUCCESS,
                            payload: userData
                        });
                        dispatch({ type: USER_ACTIONS.LOGIN_LOGOUT_PROCESS, payload: false });
                    });
                } else {
                    dispatch({ type: USER_ACTIONS.LOGIN_ERROR });
                    dispatch({ type: USER_ACTIONS.LOGIN_LOGOUT_PROCESS, payload: false });
                }
            });
    };
}

export function logout() {
    return (dispatch) => {
        dispatch({ type: USER_ACTIONS.LOGIN_LOGOUT_PROCESS, payload: true });

        performLogout()
            .then(result => {
                dispatch({ type: result ? USER_ACTIONS.LOGOUT_SUCCESS : USER_ACTIONS.LOGOUT_ERROR });
                dispatch({ type: USER_ACTIONS.LOGIN_LOGOUT_PROCESS, payload: false });
            });
    };
}