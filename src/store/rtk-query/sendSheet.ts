import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

interface SheetData {
  data: Array<Array<string | number>>;
  endpointUrl: string;
}

export const sendSheetApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "" }),
  endpoints: (builder) => ({
    saveSheet: builder.mutation<void, SheetData>({
      query: ({ data, endpointUrl }) => ({
        url: `${endpointUrl}/save-table`,
        method: "POST",
        body: { tableData: data },
      }),
    }),
  }),
});

export const { useSaveSheetMutation } = sendSheetApi;
