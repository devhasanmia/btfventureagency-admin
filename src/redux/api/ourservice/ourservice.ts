import { baseApi } from "../baseApi";

export const bookApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getServices: builder.query({
            query: () => ({
                url: "/service",
                method: "GET",
            }),
            providesTags: ["services"]
        }),
        createService: builder.mutation({
            query: (data) => ({
                url: "/service/create",
                method: "POST",
                body: data
            }),
            invalidatesTags: ["services"]
        }),
        deleteServiceById: builder.mutation({
            query: (id) => ({
                url: `/service/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["services"]
        }),
    }),
});

export const { useGetServicesQuery, useCreateServiceMutation, useDeleteServiceByIdMutation } = bookApi;