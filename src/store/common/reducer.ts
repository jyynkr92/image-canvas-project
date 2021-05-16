import { CommonActionTypes } from './actionTypes';
import { CANCEL_LOADING, Common, SET_LOADING } from './types';

const initialState: Common = {
  loading: false,
};

const commonReducer = (state = initialState, action: CommonActionTypes) => {
  switch (action.type) {
    case SET_LOADING:
      return {
        ...state,
        loading: true,
      };
    case CANCEL_LOADING:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};

export default commonReducer;
