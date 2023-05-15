import { IAutomation } from '@vulture/core';
import { api } from '../api';

const automationsAPI = api.injectEndpoints({
  endpoints: (builder) => ({
    deleteAutomation: builder.mutation<
      IAutomation,
      { metricId: string; automationId: string }
    >({
      query: ({ metricId, automationId }) => ({
        url: `metrics/${metricId}/automations/${automationId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Metrics'],
    }),
  }),
});

export const { useDeleteAutomationMutation } = automationsAPI;

export default automationsAPI;
