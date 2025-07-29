import { baseApi } from "../baseApi";

export const partnership = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        createPartnership: builder.mutation({
            query: (data) => ({
                url: "/partnership/create",
                method: "POST",
                body: data
            }),
            invalidatesTags: ["partnership"]
        }),
        getAllPartnership: builder.query({
            query: () => ({
                url: "/partnership",
                method: "GET",
            }),
            providesTags: ["partnership"]
        }),
        deletePartnership: builder.mutation({
            query: (id) => ({
                url: `/partnership/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["partnership"]
        })
    }),
});

export const { useCreatePartnershipMutation, useGetAllPartnershipQuery, useDeletePartnershipMutation } = partnership;