import React from 'react';
import jwtDecode from 'jwt-decode';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import {Provider} from 'react-redux';
import store from './store';
import setAuthToken from './utils/setAuthToken';
import * as actionTypes from './actions/actionTypes';
import PrivateRoute from './routes/PrivateRoute/PrivateRoute';
import Home from './routes/Home/Home';
import Register from './routes/Register/Register';
import Login from './routes/Login/Login';
import Settings from './routes/Settings/Settings';
import Trucks from './routes/Trucks/Trucks';
import CreateTruck from './routes/CreateTruck/CreateTruck';

function App() {
  if (localStorage.jwtToken) {
    setAuthToken(localStorage.jwtToken);

    const decodedUserData = jwtDecode(localStorage.jwtToken);

    store.dispatch({
      type: actionTypes.SET_CURRENT_USER,
      payload: decodedUserData,
    });
  }

  return (
    <Provider store={store}>
      <BrowserRouter>
        <Route exact path="/" component={Home} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/settings" component={Settings} />
        <Switch>
          <PrivateRoute exact path="/trucks" role="Driver" component={Trucks} />
        </Switch>
        <Switch>
          <PrivateRoute
            exact
            path="/create-truck"
            role="Driver"
            component={CreateTruck}
          />
        </Switch>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
