import { fetchBaseQuery } from '@reduxjs/toolkit/dist/query';

const BASE_URL = 'http://localhost:3030';

export const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL + `/api/v1/`,
});
