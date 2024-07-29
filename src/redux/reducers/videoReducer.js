// reducers/videoReducer.js
import {
  FETCH_VIDEOS_REQUEST,
  FETCH_VIDEOS_SUCCESS,
  FETCH_VIDEOS_FAILURE,
  SET_CACHED_FILES,
} from '../actions/videoActions';

const initialState = {
  loading: false,
  videos: [],
  error: '',
};

export const videoReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_VIDEOS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case FETCH_VIDEOS_SUCCESS:
      return {
        loading: false,
        videos: action.payload,
        error: '',
      };

    case FETCH_VIDEOS_FAILURE:
      return {
        loading: false,
        videos: [],
        error: action.payload,
      };
    default:
      return state;
  }
};

export default videoReducer;
