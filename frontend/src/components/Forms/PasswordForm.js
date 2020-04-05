import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {useFormik} from 'formik';
import Button from '../Buttons/Button/Button';
import {changePassword} from '../../actions/authActions';
import {clearError} from '../../actions/errorActions';

function PasswordForm(props) {
  const error = useSelector((state) => state.error);
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(clearError());
    };
  }, [dispatch]);

  const form = useFormik({
    initialValues: {
      password: '',
      newPassword: '',
      confirmNewPassword: '',
    },
    onSubmit: (values) => {
      dispatch(changePassword(values, props.history));
    },
  });
  return (
    <form className="form" onSubmit={form.handleSubmit}>
      <span className="form__title">Change password to your account</span>
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
      <label className="form__label" htmlFor="password">
        New password
      </label>
      <input
        className="form__input"
        id="newPassword"
        name="newPassword"
        type="password"
        onChange={form.handleChange}
        value={form.values.newPassword}
      />
      <label className="form__label" htmlFor="password">
        Confirm new password
      </label>
      <input
        className="form__input"
        id="confirmNewPassword"
        name="confirmNewPassword"
        type="password"
        onChange={form.handleChange}
        value={form.values.confirmNewPassword}
      />
      {error && <span className="form__error">{error}</span>}
      <div className="form__button">
        <Button text="Change" type="submit" />
      </div>
    </form>
  );
}

export default PasswordForm;
