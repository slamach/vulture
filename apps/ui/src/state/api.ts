import { createApi } from '@reduxjs/toolkit/dist/query/react';
import { baseQuery } from './baseQuery';

export const api = createApi({
  baseQuery: baseQuery,
  tagTypes: ['Metrics'],
  endpoints: () => ({}),
});
