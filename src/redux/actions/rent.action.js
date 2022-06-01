import { TYPES } from "../../constants";

// actions
export const createRentAction = (rent) => ({
  type: TYPES.CREATERENT,
  payload: rent,
});

export const getAllRentAction = (arr) => ({
  type: TYPES.GETALLRENT,
  payload: arr,
});

export const updateRentAction = (rent) => ({
  type: TYPES.UPDATERENT,
  payload: rent,
});

export const getOneRentAction = (id) => ({
  type: TYPES.GETONERENT,
  payload: id,
});

export const deleteRentAction = (id) => ({
  type: TYPES.DELETERENT,
  payload: id,
});

export const cleanRent = () => ({
  type: TYPES.CLEAN,
});
