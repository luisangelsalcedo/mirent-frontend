import { TYPES } from "../../constants";
// import { cleanFavs } from "./favs.actions";

// actions
export const loginAction = (payload) => ({
  type: TYPES.LOGIN,
  payload,
});

export const registerAction = (user) => ({
  type: TYPES.REGISTER,
  payload: user,
});

export const logoutAction = () => ({
  type: TYPES.LOGOUT,
});

export const getUserAction = (user) => ({
  type: TYPES.GETUSER,
  payload: user,
});

export const updateUserAction = (user) => ({
  type: TYPES.UPDATEUSER,
  payload: user,
});

export const exit = () => async (dispatch) => {
  dispatch(logoutAction());
  //   dispatch(cleanFavs());
};
