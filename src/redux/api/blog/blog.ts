import { baseApi } from "../baseApi";

export const blogApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllBlog: builder.query({
            query: () => ({
                url: "/blog",
                method: "GET",
            }),
            providesTags: ["blog"]
        }),
        createBlog: builder.mutation({
            query: (data) => ({
                url: "/blog/create",
                method: "POST",
                body: data
            }),
            invalidatesTags: ["blog"]
        }),
        deleteBlogById: builder.mutation({
            query: (id) => ({
                url: `/blog/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["blog"]
        }),
    }),
});

export const {useGetAllBlogQuery, useCreateBlogMutation, useDeleteBlogByIdMutation } = blogApi;