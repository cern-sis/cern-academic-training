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
        const queryParams: string[] = [];

        searchTerm && queryParams.push(`search=${searchTerm}`);
        currentPage && queryParams.push(`page=${currentPage}`);
        pageSize && queryParams.push(`page_size=${pageSize}`);

        return `/search/lectures/${queryParams.length > 0 ? "?" + queryParams.join("&") : ''}`;
      },
      transformResponse: (response: Lectures) => response.results,
    }),
    getLectureById: builder.query<Lecture, string>({
      query: (query) => `/lectures/${query}`,
    }),
  }),
});

export const { useSearchLecturesQuery, useGetLectureByIdQuery } = lecturesApi;
