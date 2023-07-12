import { combineReducers } from 'redux';
import userReducer from './userReducer'; // import your counter reducer here

const rootReducer = combineReducers({
  user: userReducer // define key-value pairs where 'counter' is the reducer key and counterReducer is the reducer function
  // you can add more key-value pairs if you have more reducers
});

export default rootReducer;
