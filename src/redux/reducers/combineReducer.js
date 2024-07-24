// reducers/index.js
import { combineReducers } from 'redux';
import videoReducer from './videoReducer';

const rootReducer = combineReducers({
  videos: videoReducer,
});

export default rootReducer;
