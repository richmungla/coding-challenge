import User from "../models/User";
import { regsiter, getUser } from "../services/AuthService";

export type authType = {
  type: string;
  user: User;
  isLoading?: boolean;
};

export const SAVE_USER = "SAVE_USER";
export const IS_LOADING = "IS_LOADING";
export const NOT_LOADING = "NOT_LOADING";

export function saveUser(user): authType {
  return {
    type: SAVE_USER,
    user,
  };
}

export function isLoading() {
  return {
    type: IS_LOADING,
    isLoading: true,
  };
}

export function notLoading() {
  return {
    type: NOT_LOADING,
    isLoading: false,
  };
}

export function loginUser(userName: string) {
  return (dispatch) => {
    getUser(userName).then((res) => {
      dispatch(isLoading());
      dispatch(saveUser(res.data.data));
      dispatch(notLoading());
    });
  };
}

export function registerUser(user: User) {
  return (dispatch) => {
    regsiter(user.name).then((res) => {
      dispatch(isLoading());
      dispatch(saveUser(res.data.data));
      dispatch(notLoading());
    });
  };
}
