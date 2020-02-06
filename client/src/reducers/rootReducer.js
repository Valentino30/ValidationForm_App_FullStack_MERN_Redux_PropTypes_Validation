import popupReducer from "./popupReducer";
import { combineReducers } from "redux";

const rootReducer = combineReducers({
  popup: popupReducer
});

export default rootReducer;
