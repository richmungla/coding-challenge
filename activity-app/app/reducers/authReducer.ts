import { SAVE_USER, IS_LOADING, NOT_LOADING } from "../actions/authActions";
import { UPDATE_ACTIVITIES } from "../actions/activityActions";
import User from "../models/User";

const initialAppState = {
  isLoading: false,
  user: null,
};
const authReducer = (state = initialAppState, action) => {
  switch (action.type) {
    case SAVE_USER:
      return {
        ...state,
        user: action.user,
      };
    case IS_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      };
    case NOT_LOADING:
      return {
        ...state,
        isLoading: action.isLoading,
      };
    case UPDATE_ACTIVITIES:
      const updatedUser: User = {
        ...state.user,
        activities: action.activities,
      };
      return {
        ...state,
        user: updatedUser,
      };

    default:
      return state;
  }
};

export default authReducer;
