import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const cabinetApiSlice = createApi({
  reducerPath: "cabinets",
  baseQuery: fetchBaseQuery({ baseUrl: "/cabinet", credentials: "same-origin" }),
  endpoints: builder => ({
    getCabinet: builder.query<any, { cabinetNumberString: string }>({
      // https://stackoverflow.com/questions/68158110/redux-toolkit-rtk-query-sending-query-parameters
      query: args => {
        const { cabinetNumberString } = args;
        return {
          url: "/",
          //   https://redux.js.org/tutorials/essentials/part-7-rtk-query-basics
          //   {url: '/posts', method: 'POST', body: newPost}
          params: {
            cabinet: cabinetNumberString
          }
        };
      }
    })
  })
});

export const { useGetCabinetQuery } = cabinetApiSlice;
