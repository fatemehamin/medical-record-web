import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import { thunk } from "redux-thunk";
import storage from "redux-persist/lib/storage";
import authReducer from "../features/auth/authSlice";
import medicalDocReducer from "../features/medicalDoc/medicalDocSlice";
import doctorsReducer from "../features/doctors/doctorsSlice";

const combineReducer = combineReducers({
  auth: authReducer,
  medicalDoc: medicalDocReducer,
  doctors: doctorsReducer,
});

const rootReducer = (state, action) => {
  // if (state?.auth?.isAuthentication && action.type === "auth/logout") {
  //   const { userInfo } = state.auth;
  //   const { i18n } = state;
  //   state = {
  //     auth: {
  //       userInfo,
  //       type: null,
  //       accessToken: null,
  //       refreshToken: null,
  //       isAuthentication: false,
  //       error: null,
  //       isLoading: false,
  //     },
  //     i18n,
  //   }; // clear all state except auth and i18n
  //   // state = undefined; //clear all state
  // }
  return combineReducer(state, action);
};

const persistConfig = { key: "root", storage };

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== "production",
  middleware: () => [thunk],
});

export const persistor = persistStore(store);
