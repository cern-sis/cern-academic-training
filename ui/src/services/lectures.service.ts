import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Lectures } from '../types/lectures';
import { Lecture } from '../types/lecture';


export const lecturesApi = createApi({
  reducerPath: 'lecturesApi',
  baseQuery: fetchBaseQuery({ baseUrl: `/api/v1/` }),
  endpoints: (builder) => ({
    getLectures: builder.query<Lecture[], string>({
      query: (query: string) => `/search/lectures/${query}`,
      transformResponse: (response: Lectures) => response.results,
    }),
  }),
});

export const { useGetLecturesQuery } = lecturesApi;
