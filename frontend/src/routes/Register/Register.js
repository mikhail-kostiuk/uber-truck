import React from 'react';
import './Register.scss';
import Header from '../../components/Header/Header';
import RegisterForm from '../../components/Forms/RegisterForm';

function Register(props) {
  return (
    <div className="register">
      <Header />
      <div className="register__form">
        <RegisterForm history={props.history} />
      </div>
    </div>
  );
}

export default Register;
