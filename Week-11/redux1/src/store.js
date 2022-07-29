import { configureStore } from "@reduxjs/toolkit";
import lightReducer from "./reducer";

export const store = configureStore({
  reducer: lightReducer,
});
