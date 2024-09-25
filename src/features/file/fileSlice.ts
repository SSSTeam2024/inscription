import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const fileSlice = createApi({
  reducerPath: "File",
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_API_URL}/api/file/`,
    // baseUrl: "http://localhost:3000/api/classes/",
  }),
  endpoints(builder) {
    return {
      fetchFile: builder.query<Blob,void>({
        query() {
            return {
              url: `/download`,
              responseHandler: (response) => response.blob(), // Handle the response as a Blob
            };
          },
      }),
    };
  },
});

export const {
 useFetchFileQuery
} = fileSlice;