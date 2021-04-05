import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import styles from './app.module.css';
import Login from './components/login/login';
import Main from './components/main/main';
import Signup from './components/sign_up/sign_up';

function App() {
  return (
    <div className={styles.app}>
      <BrowserRouter>
      <Switch>
        <Route path='/' exact>
          <Login/>
        </Route>

        <Route path='/signup' exact>
          <Signup/>
        </Route>

        <Route path='/main' exact>
          <Main/>
        </Route>
      </Switch>
      </BrowserRouter>

    </div>
  );
}

export default App;
