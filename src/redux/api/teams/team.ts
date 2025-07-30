import { baseApi } from "../../api/baseApi";

export const bookApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getTeam: builder.query({
      query: () => ({
        url: "/team",
        method: "GET",
      }),
      providesTags: ["team"],
    }),
    getSingleTeam: builder.query({
      query: (id) => ({
        url: `/team/${id}`,
        method: "GET",
      }),
      providesTags: ["team"],
    }),
    createTeam: builder.mutation({
      query: (data) => ({
        url: "/team/create",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["team"],
    }),
    deleteTeamById: builder.mutation({
      query: (id) => ({
        url: `/team/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["team"],
    }),
    updateTeam: builder.mutation({
      query: ({ id, data }) => ({
        url: `/team/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["team"],
    }),
  }),
});

export const {
  useGetTeamQuery,
  useGetSingleTeamQuery,
  useCreateTeamMutation,
  useDeleteTeamByIdMutation,
  useUpdateTeamMutation,
} = bookApi;
