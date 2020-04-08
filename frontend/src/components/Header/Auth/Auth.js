import React from 'react';
import {Link} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import {logoutUser} from '../../../actions/authActions';
import './Auth.scss';
import LinkButton from '../../Buttons/LinkButton/LinkButton';

function Auth() {
  const {isAuthenticated} = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  return (
    <div className="auth">
      <ul className="auth__list">
        {isAuthenticated ? (
          <>
            <li className="auth__item">
              <Link className="auth__link" to={`/settings`}>
                Settings
              </Link>
            </li>
            <li className="auth__item">
              <LinkButton
                text="Logout"
                onClick={() => {
                  dispatch(logoutUser());
                }}
              />
            </li>
          </>
        ) : (
          <>
            <li className="auth__item">
              <Link className="auth__link" to={`/register`}>
                Register
              </Link>
            </li>
            <li className="auth__item">
              <Link className="auth__link" to={`/login`}>
                Sign In
              </Link>
            </li>
          </>
        )}
      </ul>
    </div>
  );
}

export default Auth;
