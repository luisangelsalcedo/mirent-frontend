import { TYPES } from "../../constants";

const initialState = {
  auth: JSON.parse(localStorage.getItem("auth")) || { logged: false },
  user: null,
};

let auth;
let user;

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case TYPES.LOGIN:
      auth = { ...state.auth, ...action.payload, logged: true };
      localStorage.setItem("auth", JSON.stringify(auth));
      return { ...state, auth };

    case TYPES.LOGOUT:
      auth = { logger: false };
      localStorage.setItem("auth", JSON.stringify(auth));
      return { auth };

    case TYPES.GETUSER:
      user = action.payload;
      return { ...state, user };

    case TYPES.UPDATEUSER:
      user = { ...state.user, ...action.payload };
      return { ...state, user };

    default:
      return state;
  }
};

export default userReducer;
