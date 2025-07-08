import { combineReducers } from 'redux';

const initialState = {
  data: [],
  loading: false,
  error: null,
};

const exampleReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_START':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, data: action.payload };
    case 'FETCH_ERROR':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export default combineReducers({
  example: exampleReducer,
});