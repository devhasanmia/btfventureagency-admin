import { baseApi } from "../baseApi";

export const contact = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllMessage: builder.query({
            query: () => ({
                url: "/contact",
                method: "GET",
            })
        })
    }),
});

export const {  useGetAllMessageQuery} = contact;