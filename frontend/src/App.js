import React from 'react';
import jwtDecode from 'jwt-decode';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import {Provider} from 'react-redux';
import store from './store';
import setAuthToken from './utils/setAuthToken';
import * as actionTypes from './actions/actionTypes';
import PrivateRoute from './routes/PrivateRoute/PrivateRoute';
import Register from './routes/Register/Register';
import Login from './routes/Login/Login';

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
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
        <Switch>
          {/* <PrivateRoute exact path="/trucks" component={Trucks} /> */}
        </Switch>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
