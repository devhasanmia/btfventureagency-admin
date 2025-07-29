import { baseApi } from "../baseApi";

export const dashboard = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getDashoboard: builder.query({
            query: () => ({
                url: "/dashboard",
                method: "GET",
            }),
            providesTags: ["blog", "partnership", "recently-working", "services", "team"]
        })
    })
});

export const { useGetDashoboardQuery} = dashboard;