// src/redux/api/social/socialApi.ts

import { baseApi } from "../baseApi";

export const socialApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSocialLinks: builder.query({
      query: () => ({
        url: "/social",
        method: "GET",
      }),
      providesTags: ["socialLinks"],
    }),

    updateSocialLinks: builder.mutation({
      query: ({ id, data }) => ({
        url: `/social/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["socialLinks"],
    }),
  }),
});

export const {
  useGetSocialLinksQuery,
  useUpdateSocialLinksMutation,
} = socialApi;
