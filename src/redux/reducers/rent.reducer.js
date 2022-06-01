import { TYPES } from "../../constants";

const initialState = {
  list: [],
  rent: {},
};

const rentReducer = (state = initialState, action) => {
  switch (action.type) {
    case TYPES.CREATERENT: {
      const rent = action.payload;
      const list = [...state.list, rent];
      return { ...state, list, rent };
    }

    case TYPES.GETALLRENT: {
      const list = action.payload;
      return { ...state, list };
    }

    case TYPES.UPDATERENT: {
      const rent = action.payload;
      const list = [...state.list].map((r) =>
        r?._id === rent?._id ? rent : r
      );
      return { ...state, list, rent };
    }

    case TYPES.DELETERENT: {
      const id = action.payload;
      const list = state.list.filter((r) => r?._id !== id);
      const rent = {};
      return { ...state, list, rent };
    }

    case TYPES.CLEAN: {
      return initialState;
    }

    default:
      return state;
  }
};

export default rentReducer;
