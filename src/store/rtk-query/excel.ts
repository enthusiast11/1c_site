import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const excelApi = createApi({
  reducerPath: "excel",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3001/api/" }),
  endpoints: (build) => ({
    getExcel: build.query({
      query: () => ({
        url: "/excel",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetExcelQuery } = excelApi;
