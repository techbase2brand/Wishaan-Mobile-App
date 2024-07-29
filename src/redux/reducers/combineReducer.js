// reducers/index.js
import { combineReducers } from 'redux';
import videoReducer from './videoReducer';
import cachedFilesReducer from './cachedFilesReducer';

const rootReducer = combineReducers({
  videos: videoReducer,
  cachedFiles: cachedFilesReducer,
});

export default rootReducer;
