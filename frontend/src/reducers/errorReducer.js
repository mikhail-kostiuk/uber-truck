import * as actionTypes from '../actions/actionTypes';

const initialState = null;

const errorReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_ERROR: {
      return action.payload;
    }
    case actionTypes.CLEAR_ERROR: {
      return null;
    }
    default:
      return state;
  }
};

export default errorReducer;
