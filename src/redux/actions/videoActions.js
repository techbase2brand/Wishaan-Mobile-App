// actions/videoActions.js
export const FETCH_VIDEOS_REQUEST = 'FETCH_VIDEOS_REQUEST';
export const FETCH_VIDEOS_SUCCESS = 'FETCH_VIDEOS_SUCCESS';
export const SET_CACHED_FILES = 'SET_CACHED_FILES';
export const FETCH_CACHED_VIDEOS_SUCCESS = 'FETCH_CACHED_VIDEOS_SUCCESS';
export const FETCH_VIDEOS_FAILURE = 'FETCH_VIDEOS_FAILURE';

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
export const fetchVideosFailure = (error) => ({
  type: FETCH_VIDEOS_FAILURE,
  payload: error,
});


// export const fetchCachedVideosSuccess = (videos) => ({
//   type: FETCH_CACHED_VIDEOS_SUCCESS,
//   payload: videos,
// });