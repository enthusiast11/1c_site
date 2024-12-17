import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface Ilogin {
  username: string;
  password: string;
}

export const loginApi = createApi({
  reducerPath: "login",
  baseQuery: fetchBaseQuery({ baseUrl: "https://1c.com" }),
  endpoints: (build) => ({
    sendLogPass: build.mutation({
      query: (body: Ilogin) => ({
        url: "/login",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useSendLogPassMutation } = loginApi;
