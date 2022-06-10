import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Lectures } from '../types/lectures';
import { Lecture } from '../types/lecture';

interface LectureQuery{
  searchTerm?: string,
  currentPage?: number,
  pageSize?: number
}

export const lecturesApi = createApi({
  reducerPath: 'lecturesApi',
  baseQuery: fetchBaseQuery({ baseUrl: `/api/v1/` }),
  endpoints: (builder) => ({
    searchLectures: builder.query<Lecture[], LectureQuery>({
      query: ({searchTerm, currentPage, pageSize}: LectureQuery) => {
        let queryParams: string[] = []
        if(searchTerm)
          queryParams.push(`search=${searchTerm}`)
        if(currentPage)
          queryParams.push(`page=${currentPage}`)
        if(pageSize)
          queryParams.push(`page_size=${pageSize}`)

        let queryString = ""
        if(queryParams.length > 0)
          queryString = "?" + queryParams.join("&")

        return `/search/lectures/${queryString}`
      },
      transformResponse: (response: Lectures) => response.results,
    }),
    getLectureById: builder.query<Lecture, string>({
      query: (query) => `/lectures/${query}`,
    }),
  }),
});

export const { useSearchLecturesQuery, useGetLectureByIdQuery } = lecturesApi;
