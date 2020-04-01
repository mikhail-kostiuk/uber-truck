import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import './Auth.scss';

function Auth(props) {
  const {
    auth,
    auth: {user},
  } = props;
  console.log(auth);

  const items = auth.isAuthenticated
    ? [
        {path: 'delete-account', text: 'Delete account'},
        {path: 'log', text: 'Delete account'},
      ]
    : ['register', 'login'];

  console.log(items);
  return (
    <div className="auth">
      <ul className="auth__list">
        {items &&
          items.map((item) => (
            <li className="auth__item" key={item}>
              <Link to={`/${item}`}>
                {() => item.charAt(0).toUpperCase() + this.slice(1)}
              </Link>
            </li>
          ))}
      </ul>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};

export default connect(mapStateToProps)(Auth);
