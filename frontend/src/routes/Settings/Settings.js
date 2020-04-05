import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import './Settings.scss';
import Header from '../../components/Header/Header';
import PasswordForm from '../../components/Forms/PasswordForm';
import Button from '../../components/Buttons/Button/Button';
import {deleteUser} from '../../actions/authActions';
import {clearError} from '../../actions/errorActions';

function Settings(props) {
  const {user} = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(clearError());
    };
  }, [dispatch]);

  return (
    <div className="settings">
      <Header />
      <div className="settings__form">
        <PasswordForm history={props.history} />
      </div>
      {user.role === 'Shipper' && (
        <div className="settings__delete">
          <Button
            text="Delete account"
            type="button"
            danger
            onClick={() => deleteUser()}
          />
        </div>
      )}
    </div>
  );
}

export default Settings;
