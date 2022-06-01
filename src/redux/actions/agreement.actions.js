import { TYPES } from "../../constants";

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

export const getOneAgreementAction = (id) => ({
  type: TYPES.GETONEAGREEMENT,
  payload: id,
});

export const deleteAgreementAction = (id) => ({
  type: TYPES.DELETEAGREEMENT,
  payload: id,
});

export const cleanAgreement = () => ({
  type: TYPES.CLEAN,
});
