// reducer.js
import { RESET_MUTE, TOGGLE_MUTE } from '../actions/videoActions';

const initialState = {
  isMuted: false, // Initially unmuted
};

const muteReducer = (state = initialState, action) => {
    switch (action.type) {
      case TOGGLE_MUTE:
        return { ...state, isMuted: !state.isMuted }; // Toggle mute state
      case RESET_MUTE:
        return { ...state, isMuted: false }; // Reset mute to unmuted
      default:
        return state;
    }
  };

export default muteReducer;

