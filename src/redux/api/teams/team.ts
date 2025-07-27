import { baseApi } from "../../api/baseApi";

export const bookApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getTeam: builder.query({
            query: () => ({
                url: "/team",
                method: "GET",
            }),
            providesTags: ["team"]
        }),
        createTeam: builder.mutation({
            query: (data) => ({
                url: "/team/create",
                method: "POST",
                body: data
            }),
            invalidatesTags: ["team"]
        }),
        deleteTeamById: builder.mutation({
            query: (id) => ({
                url: `/team/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["team"]
        }),
    }),
});

export const { useGetTeamQuery, useCreateTeamMutation, useDeleteTeamByIdMutation } = bookApi;