import { baseApi } from "../baseApi";

export const recentlyWorking = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getRecentlyWorking: builder.query({
            query: () => ({
                url: "/recently-working",
                method: "GET",
            }),
            providesTags: ["recently-working"]
        }),
        createRecentlyWorking: builder.mutation({
            query: (data) => ({
                url: "/recently-working/create",
                method: "POST",
                body: data
            }),
            invalidatesTags: ["recently-working"]
        }),
        deleteRecentlyWorking: builder.mutation({
            query: (id) => ({
                url: `/recently-working/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["recently-working"]
        }),
        updateRecentlyWorking: builder.mutation({
            query: ({ id, status }) => ({
                url: `/recently-working/${id}`,
                method: "PATCH",
                body: { status }
            }),
            invalidatesTags: ["recently-working"]
        })
    }),
});

export const { useGetRecentlyWorkingQuery, useCreateRecentlyWorkingMutation, useUpdateRecentlyWorkingMutation, useDeleteRecentlyWorkingMutation } = recentlyWorking;