import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { loginApi } from "./rtk-query/login";
import adminReducer from "./admin";

export const store = configureStore({
  reducer: {
    [loginApi.reducerPath]: loginApi.reducer,

    admin: adminReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(loginApi.middleware),
});
export type RootState = ReturnType<typeof store.getState>;

setupListeners(store.dispatch);
