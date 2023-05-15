import { IMetric } from '@vulture/core';
import { api } from '../api';

const metricsAPI = api.injectEndpoints({
  endpoints: (builder) => ({
    getMetrics: builder.query<IMetric[], void>({
      query: () => ({
        url: 'metrics',
        method: 'GET',
      }),
      providesTags: ['Metrics'],
    }),
    deleteMetric: builder.mutation<IMetric, string>({
      query: (metriId) => ({
        url: `metrics/${metriId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Metrics'],
    }),
  }),
});

export const { useGetMetricsQuery, useDeleteMetricMutation } = metricsAPI;

export default metricsAPI;
