import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
export const fetchDataAPI = createApi({
  reducerPath: "fetchDataAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost/store/get_products.php",
  }),
  tagTypes: ["products", "categories", "cart"],
  endpoints: (builder) => ({
    getAllProducts: builder.query({
      query: ({}: {}) => ({
        url: "/api/campaigns/createCampaign",
        method: "GET",
      }),
      providesTags: ["products"],
    }),
  }),
});

export const { useGetAllProductsQuery } = fetchDataAPI;
