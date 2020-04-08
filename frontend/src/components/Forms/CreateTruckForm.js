import React, {useState, useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {useFormik} from 'formik';
import axios from 'axios';
import Button from '../Buttons/Button/Button';
import {clearError} from '../../actions/errorActions';

function CreateTruckForm(props) {
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(clearError());
    };
  }, [dispatch]);

  const form = useFormik({
    initialValues: {
      name: '',
      type: 'SPRINTER',
    },
    onSubmit: (values) => {
      console.log(values);
      axios
        .post('/api/trucks', values)
        .then((res) => {
          props.history.push('/trucks');
        })
        .catch((err) => {
          setError(err.response.data.error);
        });
    },
  });
  return (
    <form className="form" onSubmit={form.handleSubmit}>
      <span className="form__title">Create new truck</span>
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
      <label className="form__label" htmlFor="role">
        Type
      </label>
      <select
        className="form__input"
        id="type"
        name="type"
        onChange={form.handleChange}
        value={form.values.type}
      >
        <option value="SPRINTER">SPRINTER</option>
        <option value="SMALL STRAIGHT">SMALL STRAIGHT</option>
        <option value="LARGE STRAIGHT">LARGE STRAIGHT</option>
      </select>
      {error && <span className="form__error">{error}</span>}
      <div className="form__button">
        <Button text="Continue" type="submit" />
      </div>
    </form>
  );
}

export default CreateTruckForm;
