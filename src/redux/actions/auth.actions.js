import { TYPES } from "../../constants";
// import { cleanFavs } from "./favs.actions";

// actions
export const login = (user) => ({
  type: TYPES.LOGIN,
  payload: user,
});

export const register = (user) => ({
  type: TYPES.REGISTER,
  payload: user,
});

export const logout = () => ({
  type: TYPES.LOGOUT,
});

export const exit = () => async (dispatch) => {
  dispatch(logout());
  //   dispatch(cleanFavs());
};
