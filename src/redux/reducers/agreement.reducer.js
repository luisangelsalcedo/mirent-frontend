import { TYPES } from "../../constants";

const initialState = {
  list: [],
  agreement: {},
};

const agreementReducer = (state = initialState, action) => {
  switch (action.type) {
    case TYPES.CREATEAGREEMENT: {
      const arr = [...state.list, action.payload];
      return { ...state, list: arr, agreement: action.payload };
    }

    case TYPES.GETALLAGREEMENT: {
      const agreement = [...action.payload].filter((a) => !a?.status?.archived);
      return { ...state, list: action.payload, agreement: agreement[0] };
    }

    case TYPES.UPDATEAGREEMENT: {
      const agreement = action.payload;
      const arr = [...state.list].map((a) =>
        a._id === agreement?._id ? agreement : a
      );
      return { ...state, list: arr, agreement };
    }

    // case TYPES.GETONEPROPERTY: {
    //   const id = action.payload;
    //   const arr = [...state.list];
    //   const property = arr.find((p) => p?._id === id);
    //   //   console.log(property);

    //   return { ...state, property };
    // }

    case TYPES.DELETEAGREEMENT: {
      const id = action.payload;
      const arr = state.list.filter((a) => a?._id !== id);
      const agreement = {};

      return { ...state, list: arr, agreement };
    }

    default:
      return state;
  }
};

export default agreementReducer;
