import {
    get,
    post,
    setSessionToken,
    removeSessionToken
} from './helpers';
import { paths } from './config';

export function performLogin(login, password) {
    return post(paths.LOGIN, { login, password })
        .then(res => {
            const sessionToken = res.headers.get('session-token');

            if (sessionToken) {
                setSessionToken(sessionToken);
            }

            return res.status === 200;
        });
}

export function performLogout() {
    return post(paths.LOGOUT).then(removeSessionToken);
}

export function fetchUserData() {
    return get(paths.USER_INFO).then(res => res.status === 200 ? res.json() : null);
}

export function checkAuthStatus() {
    return get(paths.USERS).then(res => {
        if (res.status !== 200) {
            removeSessionToken();
        }

        return res.status === 200;
    });
}