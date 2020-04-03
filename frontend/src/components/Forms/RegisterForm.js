import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {useFormik} from 'formik';
import Button from '../Buttons/Button/Button';
import {registerUser} from '../../actions/authActions';
import {clearErrors} from '../../actions/errorActions';

function RegisterForm(props) {
  const error = useSelector((state) => state.error);
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(clearErrors());
    };
  }, [dispatch]);

  const form = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
      role: 'Driver',
    },
    onSubmit: (values) => {
      dispatch(registerUser(values, props.history));
    },
  });
  return (
    <form className="form" onSubmit={form.handleSubmit}>
      <span className="form__title">Create your Uber Truck account</span>
      <label className="form__label" htmlFor="name">
        Name
      </label>
      <input
        className="form__input"
        id="name"
        name="name"
        type="text"
        onChange={form.handleChange}
        value={form.values.name}
      />
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
      <label className="form__label" htmlFor="confirmPassword">
        Confirm Password
      </label>
      <input
        className="form__input"
        id="confirmPassword"
        name="confirmPassword"
        type="password"
        onChange={form.handleChange}
        value={form.values.confirmPassword}
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
        <Button text="Create" type="submit" />
      </div>
    </form>
  );
}

export default RegisterForm;
