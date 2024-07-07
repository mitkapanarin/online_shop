import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
export const fetchDataAPI = createApi({
  reducerPath: "fetchDataAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://b677-107-21-67-105.ngrok-free.app",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  }),
  tagTypes: ["products"],
  endpoints: (builder) => ({
    getAllProducts: builder.mutation<any, void>({
      query: () => ({
        url: "/graphql",
        method: "POST",
        body: {
          query:
            "{ categories { id name __typename } products { id name instock gallery description brand __typename } }",
        },
      }),
      invalidatesTags: ["products"],
    }),
  }),
});

export const { useGetAllProductsMutation } = fetchDataAPI;
