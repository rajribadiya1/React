import { createStore, applyMiddleware } from 'redux';
import {thunk} from 'redux-thunk';
import rootReducer from './reducers'; // You’ll define this soon

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;