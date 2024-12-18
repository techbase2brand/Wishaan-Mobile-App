// actions/videoActions.js
export const FETCH_VIDEOS_REQUEST = 'FETCH_VIDEOS_REQUEST';
export const FETCH_VIDEOS_SUCCESS = 'FETCH_VIDEOS_SUCCESS';
export const SET_CACHED_FILES = 'SET_CACHED_FILES';
export const FETCH_CACHED_VIDEOS_SUCCESS = 'FETCH_CACHED_VIDEOS_SUCCESS';
export const UPDATE_PAGINATION = 'UPDATE_PAGINATION';
export const FETCH_VIDEOS_FAILURE = 'FETCH_VIDEOS_FAILURE';
export const TOGGLE_MUTE = 'TOGGLE_MUTE';
export const RESET_MUTE = 'RESET_MUTE';


export const fetchVideosRequest = () => ({
  type: FETCH_VIDEOS_REQUEST,
});

export const fetchVideosSuccess = (videos) => ({
  type: FETCH_VIDEOS_SUCCESS,
  payload: videos,
});

export const setCachedFiles = (files) => {
  return {
    type: SET_CACHED_FILES,
    payload: files,
  };
};
export const updatePagination = (hasNextPage, endCursor) => ({
  type: UPDATE_PAGINATION,
  payload: { hasNextPage, endCursor },
});
export const fetchVideosFailure = (error) => ({
  type: FETCH_VIDEOS_FAILURE,
  payload: error,
});

// actions.js

export const toggleMute = () => ({
  type: TOGGLE_MUTE,
});
export const resetMute = () => ({
  type: RESET_MUTE,
});
