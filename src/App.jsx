import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { LoginPage } from 'pages';
import store from './store';
import { LoginGuard, AppRoutes, AuthChecker } from 'components';
import './App.scss';

const appTheme = {
  background1: '#C8E6C9',
  background2: '#A5D6A7',
  primary: '#43A047',
  fontColorLight: '#FFF',
  fontColorDark: '#555',
  hoverColorDark: 'rgba(67,160,71,0.1)',
  hoverColorLight: 'rgba(255,255,255,0.1)'
};

function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={appTheme}>
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
      </ThemeProvider>
    </Provider>
  );
}

export default App;
