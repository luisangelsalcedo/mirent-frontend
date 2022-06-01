import { TYPES } from "../../constants";
import { cleanAgreement } from "./agreement.actions";
import { cleanProperty } from "./property.actions";
import { cleanRent } from "./rent.action";

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
  await dispatch(cleanProperty());
  await dispatch(cleanAgreement());
  await dispatch(cleanRent());
  await dispatch(logoutAction());
};
