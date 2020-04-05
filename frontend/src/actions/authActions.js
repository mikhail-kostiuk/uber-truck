import axios from 'axios';
import jwtDecode from 'jwt-decode';
import setAuthToken from '../utils/setAuthToken';
import * as actionTypes from './actionTypes';

export const registerUser = (data, history) => {
  return (dispatch) => {
    axios
      .post('/api/users/register', data)
      .then((res) => {
        const {token} = res.data;

        login(token, history, dispatch);
      })
      .catch((err) => {
        return dispatch({
          type: actionTypes.SET_ERROR,
          payload: err.response.data.error,
        });
      });
  };
};

export const loginUser = (data, history) => {
  return (dispatch) => {
    axios
      .post('/api/users/login', data)
      .then((res) => {
        const {token} = res.data;

        login(token, history, dispatch);
      })
      .catch((err) => {
        return dispatch({
          type: actionTypes.SET_ERROR,
          payload: err.response.data.error,
        });
      });
  };
};

export const logoutUser = () => {
  return (dispatch) => {
    logout(dispatch);
  };
};

export const changePassword = (data) => {
  return (dispatch) => {
    axios
      .put('/api/users/password', data)
      .then((res) => {
        logout(dispatch);
      })
      .catch((err) => {
        return dispatch({
          type: actionTypes.SET_ERROR,
          payload: err.response.data.error,
        });
      });
  };
};

export const deleteUser = (id) => {
  return (dispatch) => {
    axios
      .delete(`/api/users/${id}`)
      .then((res) => {
        logout(dispatch);
      })
      .catch((err) => {
        return dispatch({
          type: actionTypes.SET_ERROR,
          payload: err.response.data.error,
        });
      });
  };
};

function login(token, history, dispatch) {
  localStorage.setItem('jwtToken', token);

  // Set token to Auth header
  setAuthToken(token);

  const decodedUserData = jwtDecode(token);

  dispatch({
    type: actionTypes.SET_CURRENT_USER,
    payload: decodedUserData,
  });

  history.push('/');
}

function logout(dispatch) {
  localStorage.removeItem('jwtToken');

  // Remove auth header for future requests
  setAuthToken(false);

  window.location.href = '/login';

  dispatch({
    type: actionTypes.SET_CURRENT_USER,
    payload: {},
  });
}
