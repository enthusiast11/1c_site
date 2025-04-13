import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const sendSheetApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/main" }),
  endpoints: (builder) => ({
    saveSheet: builder.mutation<void, Array<Array<string | number>>>({
      query: (data) => ({
        url: "save-table",
        method: "POST",
        body: { tableData: data },
      }),
    }),
  }),
});

export const { useSaveSheetMutation } = sendSheetApi;
