import { TYPES } from "../../constants";

const initialState = {
  list: [],
  property: {},
};

const propertyReducer = (state = initialState, action) => {
  switch (action.type) {
    case TYPES.CREATEPROPERTY: {
      const list = [...state.list, action.payload];
      return { ...state, list };
    }

    case TYPES.GETALLPROPERTY: {
      const list = action.payload;
      return { ...state, list };
    }

    case TYPES.UPDATEPROPERTY: {
      const property = action.payload;
      const list = [...state.list].map((p) =>
        p._id === property._id ? property : p
      );
      return { ...state, list, property };
    }

    case TYPES.GETONEPROPERTY: {
      const property = action.payload;
      return { ...state, property };
    }

    case TYPES.DELETEONEPROPERTY: {
      const id = action.payload;
      const list = [...state.list].filter((p) => p?._id !== id);
      const property = {};
      return { ...state, list, property };
    }

    case TYPES.CLEAN: {
      return initialState;
    }

    default:
      return state;
  }
};

export default propertyReducer;
