import React from 'react';
import './App.scss';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { LoginPage } from './pages/LoginPage';
import store from './store';
import { LoginGuard } from './components/LoginGuard';
import { AppRoutes } from './components/AppRoutes';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Route path="/login">
          <LoginPage />
        </Route>
        <LoginGuard>
          <AppRoutes/>
        </LoginGuard>
      </Router>
    </Provider>
  );
}

export default App;
