import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const baseURI = 'http://localhost:8080'

export const apiSlice = createApi({
    baseQuery: fetchBaseQuery({ baseUrl: baseURI}),
    endpoints: builder => ({
        //get categories
        getCategories: builder.query({
            //get: "http://localhost:8080/api/categories"
            query: () =>  '/api/categories',
            providesTags: ['categories']
        }),

        //get labels
        getLabels : builder.query({
            query: () => '/api/labels',
            providesTags: ['transactions']

        }),

        //add new transaction
        addTransaction:builder.mutation({

            //post: "http://localhost:8080/api/transaction"

            query: (initialTransaction) => ({
                url:'/api/transaction',
                method:"POST",
                body: initialTransaction
            }),
            invalidatesTags:['transactions']
        }),

        //delete Record
        deleteTransaction: builder.mutation({

            //delete: "http://localhost:8080/api/transaction"

            query: recordId => ({
                url: '/api/transaction',
                method: 'DELETE',
                body: recordId
            }),
            invalidatesTags:['transactions']

        }),

        //update Record
        updateTransaction: builder.mutation({

            //update: "http://localhost:8080/api/transaction"

            query: (trans) => ({
                url: '/api/transaction',
                method: 'PUT',
                body: trans,
                

            }),
            invalidatesTags:['transactions']

        })

    })
})

export default apiSlice;