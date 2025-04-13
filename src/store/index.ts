import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { loginApi } from "./rtk-query/login";
import { sendSheetApi } from "./rtk-query/sendSheet";
import adminReducer from "./admin";

export const store = configureStore({
  reducer: {
    [loginApi.reducerPath]: loginApi.reducer,
    [sendSheetApi.reducerPath]: sendSheetApi.reducer,

    admin: adminReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(loginApi.middleware, sendSheetApi.middleware),
});
export type RootState = ReturnType<typeof store.getState>;

setupListeners(store.dispatch);
