import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Lecture } from '../types/lecture';

export const lectureApi = createApi({
  reducerPath: 'lectureApi',
  baseQuery: fetchBaseQuery({ baseUrl: `/api/v1/` }),
  endpoints: (builder) => ({
    getOneLecture: builder.query<Lecture, string>({
      query: (query) => `/lectures/${query}`,
    }),
  }),
});

export const { useGetOneLectureQuery } = lectureApi;
