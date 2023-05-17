import { IData } from '@vulture/core';
import { api } from '../api';

const metricsAPI = api.injectEndpoints({
  endpoints: (builder) => ({
    getMetricData: builder.query<IData[], string>({
      query: (metricId) => ({
        url: 'data',
        method: 'GET',
        params: { metricId },
      }),
      providesTags: ['Metrics'],
    }),
  }),
});

export const { useGetMetricDataQuery } = metricsAPI;

export default metricsAPI;
