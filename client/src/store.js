import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./features/counter/planSlice";

export const store = configureStore({
  reducer: {
    // assign the reducer to the store here
    plan: counterReducer,
  },
});