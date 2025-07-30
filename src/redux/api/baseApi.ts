import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { RootState } from "../store";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://btfventureagency-server.vercel.app/api/v1", prepareHeaders: (headers, { getState }) => {
      const state = getState() as RootState;
      const token = state.auth?.token
      if (token) {
        headers.set("authorization", `${token}`);
      }
      return headers;
    }
  }),

  tagTypes: ["team", "services", "blog", "recently-working", "partnership", "socialLinks"],
  endpoints: () => ({}),
});
