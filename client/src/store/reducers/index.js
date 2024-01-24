import { combineReducers } from 'redux';
import authTokens from './authPersistReduce';

const rootReducer = combineReducers({
      authTokens,
});
export default rootReducer;
