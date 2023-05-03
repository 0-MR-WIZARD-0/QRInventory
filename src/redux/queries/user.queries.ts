import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";
import { userActions } from "redux/reducers/user.reducer";
import { User } from "types/User";

export const userApiSlice = createApi({
  reducerPath: "user-test",
  baseQuery: fetchBaseQuery({ baseUrl: "/user", credentials: "same-origin" }),
  endpoints: builder => ({
    getSelf: builder.query({
      query() {
        return {
          url: "/"
        };
      },
      transformResponse: result => {
        console.log(result);
        return result;
      },
      async onQueryStarted(args, { dispatch, queryFulfilled }) {
        console.log(args);
        try {
          const { data, meta } = await queryFulfilled;
          console.log(meta);
          dispatch(userActions.updateUser(data as User));
        } catch (error) {
          dispatch(userActions.updateUser(undefined));
        }
      }
    })
  })
});
