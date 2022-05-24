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

export const updatePropertyAction = (property, position) => ({
  type: TYPES.UPDATEPROPERTY,
  payload: { property, position },
});

export const getOnePropertyAction = (id) => ({
  type: TYPES.GETONEPROPERTY,
  payload: id,
});

export const deletePropertyAction = (id) => ({
  type: TYPES.DELETEONEPROPERTY,
  payload: id,
});
