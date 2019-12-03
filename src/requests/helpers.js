export function getSessionToken() {
    return localStorage.getItem('session-token');
}

export function setSessionToken(token) {
    localStorage.setItem('session-token', token);
}

export function removeSessionToken() {
    localStorage.removeItem('session-token');
}

export function get(url) {
    return fetch(url, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'session-token': getSessionToken()
        },
    }).catch(() => {});
}

export function post(url, body) {
    return fetch(url, {
        body: typeof body === 'string' ? body : JSON.stringify(body),
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'session-token': getSessionToken()
        },
    }).catch(() => {});
}

export function deleteReq(url, body) {
    return fetch(url, {
        body: typeof body === 'string' ? body : JSON.stringify(body),
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'session-token': getSessionToken()
        },
    }).catch(() => {});
}