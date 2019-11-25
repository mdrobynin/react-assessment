import React from 'react';
import './App.scss';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { LoginPage } from 'pages';
import store from './store';
import { LoginGuard, AppRoutes, AuthChecker } from 'components';

function App() {
  return (
    <Provider store={store}>
      <AuthChecker>
        <Router>
          <Route path="/login">
            <LoginPage />
          </Route>
          <LoginGuard>
            <AppRoutes/>
          </LoginGuard>
        </Router>
      </AuthChecker>
    </Provider>
  );
}

export default App;
