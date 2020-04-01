import * as actionTypes from '../actions/actionTypes';

const initialState = {};

const errorReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_ERROR: {
      return action.payload;
    }
    case actionTypes.CLEAR_ERRORS: {
      return {};
    }
    default:
      return state;
  }
};

export default errorReducer;
