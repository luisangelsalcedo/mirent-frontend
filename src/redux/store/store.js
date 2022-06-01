import { combineReducers, createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "@redux-devtools/extension";
import thunk from "redux-thunk";
import {
  agreementReducer,
  propertyReducer,
  rentReducer,
  userReducer,
} from "../reducers";

const rootreducer = combineReducers({
  user: userReducer,
  property: propertyReducer,
  agreement: agreementReducer,
  rent: rentReducer,
});
const store = createStore(
  rootreducer,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
