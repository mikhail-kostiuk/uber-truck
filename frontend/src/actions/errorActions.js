import * as actionTypes from './actionTypes';

export const clearError = () => {
  return (dispatch) => {
    dispatch({type: actionTypes.CLEAR_ERROR});
  };
};
