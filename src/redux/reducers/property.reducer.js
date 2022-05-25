import { TYPES } from "../../constants";

const initialState = {
  list: [],
  property: {},
};

const propertyReducer = (state = initialState, action) => {
  switch (action.type) {
    case TYPES.CREATEPROPERTY: {
      const arr = [...state.list, action.payload];
      return { ...state, list: arr };
    }

    case TYPES.GETALLPROPERTY: {
      return { ...state, list: action.payload };
    }

    case TYPES.UPDATEPROPERTY: {
      const { position, property } = action.payload;
      const arr = [...state.list];
      arr[position] = property;
      return { ...state, list: arr };
    }

    case TYPES.GETONEPROPERTY: {
      const id = action.payload;
      const arr = [...state.list];
      const property = arr.find((p) => p?._id === id);
      //   console.log(property);

      return { ...state, property };
    }

    case TYPES.DELETEONEPROPERTY: {
      const id = action.payload;
      const arr = [...state.list].filter((p) => p?._id !== id);
      const property = {};
      //   console.log(property);

      return { ...state, list: arr, property };
    }

    default:
      return state;
  }
};

export default propertyReducer;
