import { IAutomation } from '@vulture/core';
import { api } from '../api';

const automationsAPI = api.injectEndpoints({
  endpoints: (builder) => ({
    createAutomation: builder.mutation<
      IAutomation,
      { metricId: string; automation: Omit<IAutomation, '_id'> }
    >({
      query: ({ metricId, automation }) => ({
        url: `metrics/${metricId}/automations`,
        method: 'POST',
        body: automation,
      }),
      invalidatesTags: ['Metrics'],
    }),
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

export const { useCreateAutomationMutation, useDeleteAutomationMutation } =
  automationsAPI;

export default automationsAPI;
