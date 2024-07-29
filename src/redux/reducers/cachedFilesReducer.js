// reducers/cachedFilesReducer.js
import { SET_CACHED_FILES } from '../actions/videoActions';

const initialState = {
  cachedFiles: [],
};

const cachedFilesReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CACHED_FILES:
      console.log('Updating cachedFiles state with:', action.payload);
      return {
        ...state,
        cachedFiles: [...state.cachedFiles, ...action.payload],
      };
    default:
      return state;
  }
};

export default cachedFilesReducer;
