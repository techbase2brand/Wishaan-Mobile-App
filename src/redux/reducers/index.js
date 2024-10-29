import { combineReducers } from 'redux';
import videoReducer from './videoReducer';
import cachedFilesReducer from './cachedFilesReducer';
import muteReducer from './muteReducer';

const rootReducer = combineReducers({
  videos: videoReducer,
  cachedFiles: cachedFilesReducer,
  muted: muteReducer
});

export default rootReducer;
