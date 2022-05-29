import { TYPES } from "../../constants";
// import { cleanFavs } from "./favs.actions";

// actions
export const createAgreementAction = (agreement) => ({
  type: TYPES.CREATEAGREEMENT,
  payload: agreement,
});

export const getAllAgreementAction = (arr) => ({
  type: TYPES.GETALLAGREEMENT,
  payload: arr,
});

export const updateAgreementAction = (agreement) => ({
  type: TYPES.UPDATEAGREEMENT,
  payload: agreement,
});

// export const getOnePropertyAction = (id) => ({
//   type: TYPES.GETONEPROPERTY,
//   payload: id,
// });

export const deleteAgreementAction = (id) => ({
  type: TYPES.DELETEAGREEMENT,
  payload: id,
});
