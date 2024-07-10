import { configureStore } from "@reduxjs/toolkit";
import vettingTalentReducer from "./UserSlice";
import LoaderSlice from "./LoaderSlice";

export default configureStore({
  reducer: {
    vettingTalent: vettingTalentReducer,
    LoaderSlice,
  }, //all our reducer functions will go here
});
