import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import styles from './app.module.css';
import Login from './components/login/login';
import Main from './components/main/main';
import Signup from './components/sign_up/sign_up';

function App({authService}) {
  return (
    <div className={styles.app}>
      <BrowserRouter>
      <Switch>
        <Route path='/' exact>
          <Login
          authService={authService}/>
        </Route>

        <Route path='/signup' exact>
          <Signup
          authService={authService}/>
        </Route>

        <Route path='/main' exact>
          <Main
          authService={authService}/>
        </Route>
      </Switch>
      </BrowserRouter>

    </div>
  );
}

export default App;
