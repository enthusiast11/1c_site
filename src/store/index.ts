import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { loginApi } from "./rtk-query/login";
import { excelApi } from "./rtk-query/excel";

export const store = configureStore({
  reducer: {
    [loginApi.reducerPath]: loginApi.reducer,
    [excelApi.reducerPath]: excelApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(loginApi.middleware, excelApi.middleware),
});

setupListeners(store.dispatch);
