import React from 'react';
import './Login.scss';
import Header from '../../components/Header/Header';
import LoginForm from '../../components/Forms/LoginForm';

function Login(props) {
  return (
    <div className="login">
      <Header />
      <div className="login__form">
        <LoginForm history={props.history} />
      </div>
    </div>
  );
}

export default Login;
