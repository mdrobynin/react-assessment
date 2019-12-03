const path = require('path');
const fs = require('fs');
const express = require('express');
const cors = require('cors')
const uuidV1 = require('uuid/v1');

const PORT = process.env.PORT || 4321;
const sessionTokenName = 'session-token';
const authorizedUsers = {};
let {
	users,
	roles,
	categories,
	products,
} = JSON.parse(fs.readFileSync(path.join(__dirname, 'db.json'), 'utf8'));
const URLS = {
	LOGIN: '/api/login',
	LOGOUT: '/api/logout',
	USER: '/api/user',
	USERS: '/api/users',
	ROLES: '/api/roles',
	CATEGORIES: '/api/categories',
    PRODUCTS: '/api/products',
    PRODUCT: '/api/products/:id',
    CATEGORY: '/api/categories/:id',
};

function findUser(login, password) {
	return users.find(user => user.login === login && user.password === password);
}

function findAuthenticatedUserByToken(sessionToken) {
	return Object.keys(authorizedUsers).find(user => authorizedUsers[user] === sessionToken);
}

function login(req, res) {
	const { login, password } = req.body;
	const sessionToken = req.headers[sessionTokenName];
	const isUserAlreadyAuthenticated = findAuthenticatedUserByToken(sessionToken);

    if (isUserAlreadyAuthenticated) {
        res.sendStatus(200);
        return;
	}
	
	const user = findUser(login, password);

    if(!user) {
        res.sendStatus(400);
        return;
    }

    const newSessionToken = uuidV1();
    authorizedUsers[login] = newSessionToken;
    res.set(sessionTokenName, newSessionToken);
    res.set('Access-Control-Expose-Headers', sessionTokenName);
    res.sendStatus(200);
}

function logout(req, res) {
	const sessionToken = req.headers[sessionTokenName];
	const user = findAuthenticatedUserByToken(sessionToken);

    if (!user) {
        res.sendStatus(400);
        return;
    }

    delete authorizedUsers[user.login];
    res.sendStatus(200);
}

function authorizationGuard(req, res, next) {
	const sessionToken = req.headers[sessionTokenName];
	const isLoginRoute = req.path === URLS.LOGIN || req.path === URLS.LOGOUT;
	const userAuthenticated = sessionToken && findAuthenticatedUserByToken(sessionToken);

    if (isLoginRoute || userAuthenticated) {
        next();
    } else {
        res.sendStatus(401);
    }
}

function getUserByToken(req, res) {
    const sessionToken = req.headers[sessionTokenName];
	const login = findAuthenticatedUserByToken(sessionToken);
	const user = users.find(x => x.login === login);
	const userRole = roles.find(x => x.id === user.roleId);

    if (login) {
        res.json({...user, role: userRole.name});
    } else {
        res.sendStatus(404);
    }
}

const app = express();
app.use(express.json());
app.use(cors());
app.use(authorizationGuard);

app.post(URLS.LOGIN, login);
app.post(URLS.LOGOUT, logout);
app.get(URLS.USER, getUserByToken);
app.get(URLS.USERS, (req, res) => res.json(users));
app.get(URLS.ROLES, (req, res) => res.json(roles));
app.get(URLS.CATEGORIES, (req, res) => res.json(categories));
app.get(URLS.PRODUCTS, (req, res) => res.json(products));
app.get(URLS.CATEGORY, (req, res) => res.json(categories.find(x => x.id === +req.params.id)));
app.get(URLS.PRODUCT, (req, res) => res.json(products.find(x => x.id === +req.params.id)));
app.delete(URLS.PRODUCT, (req, res) => {
    products = products.filter(x => x.id !== +req.params.id);
    res.json({ success: true });
})

app.listen(PORT, () => {
  console.log(`Server is listening on port ${ PORT }`);
});
