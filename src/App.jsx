import React from 'react';
import './App.scss';
import { Provider } from 'react-redux'
import store from './store';
import { LoginGuard } from './components/LoginGuard';

function App() {

  return (
    <Provider store={store}>
      <LoginGuard/>
    </Provider>
  );
}

export default App;
