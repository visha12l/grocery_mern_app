import { combineReducers } from "redux";
import userSlice from "./userSlice";
import productSlice from "./productSlice";

export default combineReducers({
  userSlice,
  productSlice
});
