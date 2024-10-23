// reducers/videoReducer.js
import {
  FETCH_VIDEOS_REQUEST,
  FETCH_VIDEOS_SUCCESS,
  UPDATE_PAGINATION,
  FETCH_VIDEOS_FAILURE,
} from '../actions/videoActions';

const initialState = {
  loading: false,
  videos: [],
  error: '',
  endCursor: null,
  hasNextPage: true,
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
      case UPDATE_PAGINATION:
        return {
          ...state,
          hasNextPage: action.payload.hasNextPage,
          endCursor: action.payload.endCursor,
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
