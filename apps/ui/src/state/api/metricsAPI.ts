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
    createMetric: builder.mutation<
      IMetric,
      Omit<IMetric, '_id' | 'automations'>
    >({
      query: (metric) => ({
        url: `metrics`,
        method: 'POST',
        body: metric,
      }),
      invalidatesTags: ['Metrics'],
    }),
    getSingleMetric: builder.query<IMetric, string>({
      query: (metricId) => ({
        url: `metrics/${metricId}`,
        method: 'GET',
      }),
      providesTags: ['Metrics'],
    }),
    deleteMetric: builder.mutation<IMetric, string>({
      query: (metricId) => ({
        url: `metrics/${metricId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Metrics'],
    }),
  }),
});

export const {
  useGetMetricsQuery,
  useCreateMetricMutation,
  useGetSingleMetricQuery,
  useDeleteMetricMutation,
} = metricsAPI;

export default metricsAPI;
