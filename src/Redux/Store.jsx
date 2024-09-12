import { combineReducers, configureStore } from "@reduxjs/toolkit";
import vettingTalentReducer from "./UserSlice";
import storage from "redux-persist/lib/storage";
// import { jobSlice } from "./jobSlice";
import {
  persistReducer,
  persistStore,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import { thunk } from "redux-thunk";
import jobSlice from "./JobSlice";
import TalentSlice from "./TalentSlice";
import EmployerSlice from "./EmployerSlice";
import HealthSlice from "./HealthSlice";
import SuspendUserSlice from "./SuspendUserSlice";
import SubsriptionSlice from "./SubsriptionSlice";
import TransactionSlice from "./TransactionSlice";
import AccountHistorySlice from "./AccountHistorySlice";
import JobHistorySlice from "./JobHistorySlice";
import ApplicantSlice from "./ApplicantSlice";
import InterviewSlice from "./InterviewSlice";
import UserSlice from "./UserSlice";
import FeaturedTalent from "./FeaturedTalentSlice";
import FeedBackSlice from "./FeedBackSlice";

export default configureStore({
  reducer: {
    vettingTalent: vettingTalentReducer,
    jobSlice,
    TalentSlice,
    EmployerSlice,
    HealthSlice,
    SuspendUserSlice,
    SubsriptionSlice,
    TransactionSlice,
    AccountHistorySlice,
    JobHistorySlice,
    ApplicantSlice,
    InterviewSlice,
    UserSlice,
    FeaturedTalent,
    FeedBackSlice,
  }, //all our reducer functions will go here
});
// const persistConfig = {
//   key: "root",
//   storage,
// };

// const persistedReducer = persistReducer(persistConfig, vettingTalentReducer);

// export const store = configureStore({
//   reducer: persistedReducer,
//   devTools: process.env.NODE_ENV !== "production",
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware({
//       serializableCheck: {
//         ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
//       },
//     }),
// });

// export const  = persistStore(store);
