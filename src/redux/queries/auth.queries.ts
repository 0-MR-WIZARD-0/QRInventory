import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { userApiSlice } from "./user.queries";

export const authApiSlice = createApi({
  reducerPath: "auth",
  baseQuery: fetchBaseQuery({ baseUrl: "/auth", credentials: "same-origin" }),
  endpoints: builder => ({
    // If you're fetching and caching data from the server, it's a query.
    // If you're sending an update to the server, it's a mutation.
    login: builder.mutation<any, { email: string; password: string }>({
      query: data => {
        return {
          url: "login",
          method: "POST",
          body: data
        };
      },
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          await dispatch(userApiSlice.endpoints.getSelf.initiate(null));
        } catch (error) {}
      }
    }),
    logout: builder.mutation({
      query: () => {
        return {
          url: "logout",
          method: "GET"
        };
      },
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          await dispatch(userApiSlice.endpoints.getSelf.initiate(null));
        } catch (error) {}
      }
    })
  })
});

export const { useLoginMutation, useLogoutMutation } = authApiSlice;
