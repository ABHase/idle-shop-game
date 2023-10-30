// store.ts
import { configureStore } from "@reduxjs/toolkit";
import merchandiseReducer from "./merchandiseSlice";

const store = configureStore({
  reducer: {
    merchandise: merchandiseReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
