// reducers/videoReducer.js
import {
    FETCH_VIDEOS_REQUEST,
    FETCH_VIDEOS_SUCCESS,
    FETCH_CACHED_VIDEOS_SUCCESS,
    FETCH_VIDEOS_FAILURE,
  } from '../actions/videoActions';
  
  const initialState = {
    loading: false,
    videos: [],
    cachedVideos: [],
    error: '',
  };
  
  const videoReducer = (state = initialState, action) => {
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
        case FETCH_CACHED_VIDEOS_SUCCESS:
            return {
              ...state,
              cachedVideos: action.payload,
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
  