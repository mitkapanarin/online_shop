import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IDataFetch } from "../../_Types";

// Define a service using a base URL and expected endpoints
export const fetchDataAPI = createApi({
  reducerPath: "fetchDataAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_APP_API_URL,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  }),
  tagTypes: ["products"],
  endpoints: (builder) => ({
    getAllProducts: builder.query<IDataFetch, void>({
      query: () => ({
        url: "/graphql",
        method: "POST",
        body: JSON.stringify({
          query:
            "{ categories { id name __typename } products { id attributes { id name items { id displayValue value __typename } type __typename } name category instock gallery prices { amount __typename currency { label symbol __typename } } description brand __typename } }",
        }),
      }),
      providesTags: ["products"],
    }),
  }),
});

export const { useGetAllProductsQuery } = fetchDataAPI;
