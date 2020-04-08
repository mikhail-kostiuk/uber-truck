import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import {useSelector} from 'react-redux';

function PrivateRoute({component: Component, role, ...rest}) {
  const {isAuthenticated} = useSelector((state) => state.auth);
  const {user} = useSelector((state) => state.auth);

  const universalRoute = (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated === true ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );

  const roleRoute = (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated === true && user.role === role ? (
          <Component {...props} />
        ) : (
          <Redirect to="/" />
        )
      }
    />
  );

  return role ? roleRoute : universalRoute;
}

export default PrivateRoute;
