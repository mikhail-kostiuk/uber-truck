import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {useFormik} from 'formik';
import Button from '../Buttons/Button/Button';
import {loginUser} from '../../actions/authActions';
import {clearErrors} from '../../actions/errorActions';

function LoginForm(props) {
  const error = useSelector((state) => state.error);
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(clearErrors());
    };
  }, [dispatch]);

  const form = useFormik({
    initialValues: {
      email: '',
      password: '',
      role: 'Driver',
    },
    onSubmit: (values) => {
      dispatch(loginUser(values, props.history));
    },
  });
  return (
    <form className="form" onSubmit={form.handleSubmit}>
      <span className="form__title">Sign in to your account</span>
      <label className="form__label" htmlFor="email">
        Email
      </label>
      <input
        className="form__input"
        id="email"
        name="email"
        type="email"
        onChange={form.handleChange}
        value={form.values.email}
      />
      <label className="form__label" htmlFor="password">
        Password
      </label>
      <input
        className="form__input"
        id="password"
        name="password"
        type="password"
        onChange={form.handleChange}
        value={form.values.password}
      />
      <label className="form__label" htmlFor="role">
        Role
      </label>
      <select
        className="form__input"
        id="role"
        name="role"
        onChange={form.handleChange}
        value={form.values.role}
      >
        <option value="Driver">Driver</option>
        <option value="Shipper">Shipper</option>
      </select>
      {error && <span className="form__error">{error}</span>}
      <div className="form__button">
        <Button text="Continue" type="submit" />
      </div>
    </form>
  );
}

export default LoginForm;
