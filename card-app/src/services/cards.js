import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const cardApi = createApi({
  reducerPath: 'cardApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://pokeapi.co/api/v2/' }),
  endpoints: (builder) => ({
    getCardByName: builder.query({
      query: (name) => `card/${name}`,
    }),
  }),
})

export const { useGetCardByNameQuery } = cardApi