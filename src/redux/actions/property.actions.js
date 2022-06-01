import { TYPES } from "../../constants";
// import { cleanFavs } from "./favs.actions";

// actions
export const createPropertyAction = (property) => ({
  type: TYPES.CREATEPROPERTY,
  payload: property,
});

export const getAllPropertyAction = (arr) => ({
  type: TYPES.GETALLPROPERTY,
  payload: arr,
});

export const updatePropertyAction = (property) => ({
  type: TYPES.UPDATEPROPERTY,
  payload: property,
});

export const getOnePropertyAction = (property) => ({
  type: TYPES.GETONEPROPERTY,
  payload: property,
});

export const deletePropertyAction = (id) => ({
  type: TYPES.DELETEONEPROPERTY,
  payload: id,
});

export const cleanProperty = () => ({
  type: TYPES.CLEAN,
});
