import { USER_ACTIONS } from '../actions';

const initialState = {
    isLoginLogoutInProcess: false,
    loginError: null,
    logoutError: null,
    authenticated: false,
    userData: null
};

export default function(state = initialState, action) {
    switch (action.type) {
        case USER_ACTIONS.LOGIN_LOGOUT_PROCESS: {
            return {
                ...state,
                isLoginLogoutInProcess: action.payload,
                loginError: null,
                logoutError: null
            };
        }
        case USER_ACTIONS.LOGIN_SUCCESS: {
            return {...state, userData: action.payload };
        }
        case USER_ACTIONS.LOGIN_ERROR: {
            return {...state, loginError: action.payload };
        }
        case USER_ACTIONS.LOGOUT_SUCCESS: {
            return {...state, userData: null }; 
        }
        case USER_ACTIONS.LOGOUT_ERROR: {
            return {...state, logoutError: action.payload };
        }
        default:
            return state;
    }
}
