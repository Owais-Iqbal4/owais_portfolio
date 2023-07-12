import { createStore } from 'redux';
import rootReducer from './reducers/combineReducer'; // assuming you have a rootReducer

const store = createStore(rootReducer); // pass your rootReducer here

export default store;
