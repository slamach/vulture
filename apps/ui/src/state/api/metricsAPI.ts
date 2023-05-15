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
    getSingleMetric: builder.query<IMetric, string>({
      query: (metricId) => ({
        url: `metrics/${metricId}`,
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

export const {
  useGetMetricsQuery,
  useGetSingleMetricQuery,
  useDeleteMetricMutation,
} = metricsAPI;

export default metricsAPI;
