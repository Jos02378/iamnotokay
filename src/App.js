import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';

import './App.scss';
import * as ROUTE from './constants/routes';
import { useAuth, useToxicityClassifier } from './hooks';
import { UserContext, ToxicityModelContext } from './contexts';
import {
  Homepage,
  Profile,
  Login,
  Register,
  Write,
  Story,
  Collection,
} from './pages';
import { Navbar } from './components';

function App() {
  const { user } = useAuth();
  const toxicityModel = useToxicityClassifier();

  return (
    <UserContext.Provider value={user}>
      <ToxicityModelContext.Provider value={toxicityModel}>
        <Router>
          <div className='wrapper'>
            <Navbar />
            <Switch>
              <Route path={ROUTE.HOMEPAGE} exact component={Homepage} />
              <Route path={ROUTE.PROFILE} exact component={Profile} />
              <Route path={ROUTE.LOG_IN} exact component={Login} />
              <Route path={ROUTE.REGISTER} exact component={Register} />
              <Route path={ROUTE.WRITE} exact component={Write} />
              <Route path={ROUTE.STORY} exact component={Story} />
              <Route path={ROUTE.COLLECTION} exact component={Collection} />
            </Switch>
          </div>
        </Router>
      </ToxicityModelContext.Provider>
    </UserContext.Provider>
  );
}

export default App;
